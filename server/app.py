from flask import Flask
from models import db, Car, User, Review, Order
from flask_migrate import Migrate
from flask import Flask, request, make_response
from flask_restful import Api, Resource
from flask_cors import CORS
from flask import jsonify
from flask_login import LoginManager, login_user
from flask_login import login_required
from flask_login import current_user
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'], supports_credentials=True)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)
api = Api(app)

login_manager = LoginManager()
login_manager.init_app(app)

app.secret_key = os.urandom(24)



@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')

    user = User.query.filter_by(email = email).first()
    if user:
        return jsonify({'message': 'Email already exists!'}), 400
    
    new_user = User(email = email, name = name)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

@login_manager.user_loader
def load_user(id):
    return db.session.get(User, int(id))


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        login_user(user)
        return jsonify({'message': 'Logged in successfully!'}), 200
    return jsonify({'message': 'Invalid credentials!'}), 401

@app.route('/secure-endpoint')

@login_required
def secure_endpoint():
    return jsonify({'message': 'This is a secure endpoint!'})

class Cars(Resource):
    def get(self):
        cars = [c.to_dict() for c in Car.query.all()]
        return make_response(cars, 200)
    
api.add_resource(Cars, '/cars')

class Users(Resource):
    def get(self):
        users = [u.to_dict() for u in User.query.all()]
        return make_response(users, 200)

api.add_resource(Users, '/users')

@app.route('/create-order', methods=['POST'])
@login_required
def create_order():
    data = request.get_json()
    car_id = data.get('car_id')

    car = db.session.get(Car, car_id)  

    if not car:
        return jsonify({'message': 'Car not found!'}), 404

    user_id = current_user.get_id()
    order = Order(user_id=user_id, car_id=car_id)
    db.session.add(order)
    db.session.commit()

    return jsonify({'message': 'Order created successfully'}), 201

    print(request)

@app.route('/orders', methods=['GET'])
def get_orders():
    orders = [o.to_dict() for o in Order.query.all()]
    return make_response(orders, 200)

class OrdersById(Resource):

    def delete(self, id):
        order = Order.query.filter_by(id = id).first()
        db.session.delete(order)
        db.session.commit()
        return make_response({}, 202)
    
api.add_resource(OrdersById, '/orders/<int:id>')

class Reviews(Resource):
    def get(self):
        reviews = [r.to_dict() for r in Review.query.all()]
        return make_response(reviews, 200)
    
    def post(self):
        data = request.get_json()
        reviews =[r.to_dict() for r in Review.query.all()]
        new_Review = Review(comment = data['comment'])
        db.session.add(new_Review)
        db.session.commit()
        return make_response(new_Review.to_dict(), 201)
    
api.add_resource(Reviews, '/reviews')

class ReviewsById(Resource):
    def patch(self, id):
        data = request.get_json()
        review = Review.query.filter_by(id = id).first()
        if not review:
            return make_response(
                {'error': 'can not find that review'}, 404
            )
        for key in data:
            try:
                setattr(review, key, data[key])
            except ValueError as v_error:
                return make_response({'errors': [str(v_error)]}, 422)
            
        db.session.commit()
        return make_response(review.to_dict(), 200)
    
    def delete(self, id):
        review = Review.query.filter_by(id = id).first()
        if review is None:
            return jsonify({'message': 'Review not found'}), 404
        db.session.delete(review)
        db.session.commit()
        return make_response({}, 202)
    
api.add_resource(ReviewsById, '/reviews/<int:id>')






if __name__ == '__main__':
    app.run(port=5555, debug=True)

