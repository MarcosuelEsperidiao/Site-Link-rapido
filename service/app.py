from flask import Flask, request, jsonify
from datetime import datetime, timedelta, date
from config import Config
from models import db, Worker, Service, Client, Appointment
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

CORS(app)

with app.app_context():
    db.create_all()

@app.route('/worker', methods=['POST'])
def create_worker():
    data = request.get_json()
    worker = Worker(name=data['name'], email=data['email'], phone=data['phone'])
    db.session.add(worker)
    db.session.commit()
    return jsonify({'message': 'Worker created successfully'}), 201

@app.route('/workers', methods=['POST'])
def create_workers():
    data = request.get_json()
    workers = [Worker(name=worker['name'], email=worker['email'], phone=worker['phone']) for worker in data]
    db.session.bulk_save_objects(workers)
    db.session.commit()
    return jsonify({'message': 'Workers created successfully'}), 201

@app.route('/workers', methods=['GET'])
def get_workers():
    workers = Worker.query.all()
    return jsonify([{'id': worker.id, 'name': worker.name, 'email': worker.email, 'phone': worker.phone} for worker in workers])

@app.route('/worker/<int:worker_id>', methods=['DELETE'])
def delete_worker(worker_id):
    worker = Worker.query.get(worker_id)
    if worker:
        db.session.delete(worker)
        db.session.commit()
        return jsonify({'message': 'Worker deleted successfully'})
    return jsonify({'message': 'Worker not found'}), 404

@app.route('/services', methods=['GET'])
def get_services():
    services = Service.query.all()
    return jsonify([{'id': service.id, 'name': service.name, 'duration': service.duration, 'value': service.value, 'worker_id': service.worker_id} for service in services])
@app.route('/services/today', methods=['GET'])
def get_services_today():
    today = date.today()
    start_of_day = datetime.combine(today, datetime.min.time())
    end_of_day = datetime.combine(today, datetime.max.time())
    appointments = Appointment.query.filter(Appointment.start_time.between(start_of_day, end_of_day), Appointment.status == 'confirmado').all()
    return jsonify([{'id': appointment.id, 'service_id': appointment.service_id, 'client_id': appointment.client_id, 'worker_id': appointment.worker_id, 'start_time': appointment.start_time, 'end_time': appointment.end_time} for appointment in appointments])

@app.route('/client', methods=['POST'])
def create_client():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')

    # Verifica se o cliente já existe na base
    existing_client = Client.query.filter_by(name=name, email=email, phone=phone).first()
    if existing_client:
        return jsonify({'message': 'Client already exists'}), 400

    # Cria um novo cliente apenas se não existir na base
    client = Client(name=name, email=email, phone=phone)
    db.session.add(client)
    db.session.commit()

    # Retorna os detalhes do cliente criado
    client_data = {
        'id': client.id,
        'name': client.name,
        'email': client.email,
        'phone': client.phone
    }
    
    return jsonify({'message': 'Client created successfully', 'client': client_data}), 201

@app.route('/clients', methods=['GET'])
def get_clients():
    clients = Client.query.all()
    return jsonify([{'id': client.id, 'name': client.name, 'email': client.email, 'phone': client.phone} for client in clients])

@app.route('/service', methods=['POST'])
def create_service():
    data = request.get_json()
    name = data['name']
    duration = data['duration']
    value = data['value']
    worker_id = data['worker_id']
    
    # Verifica se o trabalhador existe antes de criar o serviço
    worker = Worker.query.get(worker_id)
    
    if not worker:
        return jsonify({'message': 'Worker not found'}), 404

    # Cria o serviço
    service = Service(name=name, duration=duration, value=value, worker_id=worker_id)
    db.session.add(service)
    db.session.commit()

    return jsonify({'message': 'Service created successfully'}), 201

@app.route('/appointment', methods=['POST'])
def create_appointment():
    data = request.get_json()
    service_id = data['service_id']
    client_id = data['client_id']
    worker_id = data['worker_id']
    start_time = datetime.strptime(data['start_time'], '%Y-%m-%d %H:%M:%S')

    # Verifique se o serviço existe
    service = Service.query.get(service_id)
    if not service:
        return jsonify({'message': 'Service not found'}), 404

    # Verifique se o cliente existe
    client = Client.query.get(client_id)
    if not client:
        return jsonify({'message': 'Client not found'}), 404

    # Verifique se o trabalhador existe
    worker = Worker.query.get(worker_id)
    if not worker:
        return jsonify({'message': 'Worker not found'}), 404

    duration = service.duration
    end_time = start_time + timedelta(minutes=duration)

    # Verificar se o trabalhador está disponível
    conflicting_appointments = Appointment.query.filter(
        Appointment.worker_id == worker_id,
        Appointment.status == 'confirmado',
        Appointment.start_time < end_time,
        Appointment.end_time > start_time
    ).all()

    if conflicting_appointments:
        return jsonify({'message': 'Worker is not available at this time'}), 409

    # Criar o agendamento
    appointment = Appointment(
        service_id=service_id,
        client_id=client_id,
        worker_id=worker_id,
        start_time=start_time,
        end_time=end_time,
        status='confirmado'
    )
    db.session.add(appointment)
    db.session.commit()

    # Retornar o objeto criado
    appointment_data = {
        'id': appointment.id,
        'service_id': appointment.service_id,
        'client_id': appointment.client_id,
        'worker_id': appointment.worker_id,
        'start_time': appointment.start_time.strftime('%Y-%m-%d %H:%M:%S'),
        'end_time': appointment.end_time.strftime('%Y-%m-%d %H:%M:%S'),
        'status': appointment.status
    }

    return jsonify({'message': 'Appointment created successfully', 'appointment': appointment_data}), 201

@app.route('/worker-services', methods=['GET'])
def get_worker_services():
    try:
        worker_id = int(request.args.get('worker_id'))  # ID do trabalhador

        # Consulta os serviços relacionados ao trabalhador específico
        services = Service.query.filter(Service.worker_id == worker_id).all()

        # Converte os serviços em uma lista de dicionários para retornar como JSON
        services_list = [{
            'id': service.id,
            'name': service.name,
            'duration': service.duration,
            'price': service.value
        } for service in services]

        return jsonify({'services': services_list}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

from datetime import datetime, timedelta
from datetime import datetime, timedelta

@app.route('/available-hours', methods=['GET'])
def get_available_hours():
    try:
        # Data específica para a qual você deseja obter os horários disponíveis
        date_str = request.args.get('date')
        worker_id = int(request.args.get('worker_id'))  # ID do trabalhador

        date = datetime.strptime(date_str, '%Y-%m-%d')

        # Horários de funcionamento padrão (pode ser ajustado conforme necessário)
        start_time = datetime.combine(date, datetime.min.time()) + timedelta(hours=9)
        end_time = datetime.combine(date, datetime.min.time()) + timedelta(hours=18)

        # Consulta os horários já agendados para esse trabalhador na data específica
        appointments = Appointment.query.filter(
            Appointment.worker_id == worker_id,
            Appointment.start_time >= start_time,
            Appointment.end_time <= end_time,
            Appointment.status == 'confirmado'  # Apenas horários confirmados
        ).all()

        # Cria um conjunto de horários disponíveis inicialmente todos os horários de funcionamento
        available_hours = set()
        current_time = start_time
        while current_time < end_time:
            available_hours.add(current_time.strftime('%H:%M'))
            current_time += timedelta(minutes=30)  # Incremento de 30 minutos

        # Remove os horários já agendados do conjunto de horários disponíveis
        for appointment in appointments:
            appointment_start = appointment.start_time
            appointment_end = appointment.end_time
            while appointment_start < appointment_end:
                available_hours.discard(appointment_start.strftime('%H:%M'))
                appointment_start += timedelta(minutes=30)

        # Retorna os horários disponíveis como uma lista ordenada
        available_hours = sorted(list(available_hours))

        return jsonify({'available_hours': available_hours}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/service/<int:service_id>', methods=['DELETE'])
def delete_service(service_id):
    # Busca o serviço pelo ID
    service = Service.query.get(service_id)
    
    # Verifica se o serviço existe
    if not service:
        return jsonify({'message': 'Service not found'}), 404
    
    # Remove o serviço do banco de dados
    db.session.delete(service)
    db.session.commit()
    
    return jsonify({'message': 'Service deleted successfully'}), 200

    
if __name__ == '__main__':
    app.run(debug=True)