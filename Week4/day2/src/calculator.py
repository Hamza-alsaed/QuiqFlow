def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        return "Error: Division by zero!"
    return a / b


if __name__ == "__main__":
    print("Simple Calculator")
    x = float(input("Enter first number: "))
    y = float(input("Enter second number: "))

    print("\nChoose operation:")
    print("1- Addition", "2- Subtraction", "3- Multiplication", "4- Division", sep="\n")
    op = input("Operation: ")

    if op == "Addition" or op == "1":
        print("Result:", add(x, y))
    elif op == "Subtraction" or op == "2":
        print("Result:", subtract(x, y))
    elif op == "Multiplication" or op == "3":
        print("Result:", multiply(x, y))
    elif op == "Division" or op == "4":
        print("Result:", divide(x, y))
    else:
        print("Invalid operation")
