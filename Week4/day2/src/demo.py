from models.settings import settings
from models.user_schema import UserSchema

def print_configs():
    print("App Configuration:")
    print(f"Name: {settings.app_name}")
    print(f"Version: {settings.app_version}")
    print(f"Debug Mode: {settings.debug}")
    print(f"Database URL: {settings.database_url}")

def demo_user():
    try:
        user = UserSchema(username="Alice123", email="alice@example.com", age=25)
        print("\nUser Schema Example:")
        print(user)
    except Exception as e:
        print("Validation Error:", e)

if __name__ == "__main__":
    print_configs()
    demo_user()
