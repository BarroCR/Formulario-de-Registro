from flask import jsonify

def user_response(user):
    response = {
        'status': 'success',
        'user': {
            'name': user.name,
            'email': user.email,
            'phone': user.phone
        }
    }
    return jsonify(response)
