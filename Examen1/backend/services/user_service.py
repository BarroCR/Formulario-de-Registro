from models.user import User

class UserService:
    def __init__(self):
        # Simulamos un almacenamiento en memoria usando un diccionario
        self.users = {}
        self.next_user_id = 1

    def create_user(self, name, email,phone):
        # Crea un nuevo usuario con un ID único y lo guarda en el diccionario de usuarios
        user_id = self.next_user_id
        self.next_user_id += 1
        user = User(user_id, name, email,phone)
        self.users[user_id] = user
        return user

    def get_user(self, user_id):
        # Obtiene un usuario del diccionario de usuarios usando su ID
        return self.users.get(user_id)

    def update_user(self, user_id, name, email,phone):
        # Actualiza el nombre y el correo electrónico de un usuario existente
        if user_id in self.users:
            user = self.users[user_id]
            user.name = name
            user.email = email
            user.phone = phone
            return True
        return False

    def delete_user(self, user_id):
        # Elimina un usuario del diccionario de usuarios usando su ID
        if user_id in self.users:
            del self.users[user_id]
            return True
        return False
    
    def get_all_users(self):
        # Devuelve una lista de todos los usuarios en el diccionario de usuarios
        return [user.serialize() for user in self.users.values()]
