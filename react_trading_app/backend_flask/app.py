from flask import Flask, request, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

traders = []


# GET all traders
@app.route('/dashboard/traders', methods=['GET'])
def get_traders():
    return jsonify(traders)


# GET single trader
@app.route('/dashboard/profile/traderId/<int:id>', methods=['GET'])
def get_trader(id):
    trader = next((t for t in traders if t["id"] == id), None)
    return jsonify(trader)


# CREATE trader
@app.route('/trader', methods=['POST'])
def create_trader():
    data = request.json

    new_trader = {
        "id": int(time.time() * 1000),
        "amount": 0,   # IMPORTANT
        **data
    }

    traders.append(new_trader)
    return jsonify(new_trader)


# DELETE trader
@app.route('/trader/<int:id>', methods=['DELETE'])
def delete_trader(id):
    global traders
    traders = [t for t in traders if t["id"] != id]
    return '', 200


# DEPOSIT funds
@app.route('/trader/deposit/traderId/<int:id>/amount/<int:amount>', methods=['PUT'])
def deposit(id, amount):
    trader = next((t for t in traders if t["id"] == id), None)

    if trader:
        trader["amount"] += amount

    return jsonify(trader)


# WITHDRAW funds
@app.route('/trader/withdraw/traderId/<int:id>/amount/<int:amount>', methods=['PUT'])
def withdraw(id, amount):
    trader = next((t for t in traders if t["id"] == id), None)

    if trader and trader["amount"] >= amount:
        trader["amount"] -= amount

    return jsonify(trader)


if __name__ == '__main__':
    app.run(port=8080, debug=True)
