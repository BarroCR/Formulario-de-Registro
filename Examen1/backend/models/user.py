class User:
    def __init__(self, user_id, name, email, phone):
        self.user_id = user_id
        self.name = name
        self.email = email
        self.phone = phone

    def serialize(self):
        return {
            'id': self.user_id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone
        }