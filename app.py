from flask import Flask, render_template, send_from_directory, request, jsonify

app = Flask(__name__)

# Simulating an in-memory database for student project themes
bookings_db = []

@app.route('/')
def home():
    # Renders the interface, passing the live data array to the template
    return render_template('index.html', bookings=bookings_db)

@app.route('/add_booking', methods=['POST'])
def add_booking():
    data = request.get_json()
    item_name = data.get('item', '').strip()
    if item_name:
        bookings_db.append(item_name)
        return jsonify({"status": "success", "bookings": bookings_db}), 200
    return jsonify({"status": "error", "message": "Invalid item name"}), 400

# CRITICAL PWA ROUTE: Service Workers must be served from the root scope, not /static/js/
@app.route('/sw.js')
def service_worker():
    return send_from_directory('static', 'sw.js', mimetype='application/javascript')

if __name__ == '__main__':
    # Runs the local development server on http://127.0.0.1:5000
    app.run(debug=True)
