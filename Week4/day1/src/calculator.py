# src/calculator.py
from typing import Union

Number = Union[int, float]

def _to_number(value) -> Number:
    """Convert input to int or float, with error handling."""
    try:
        # Allow numeric strings like "3" or "3.14"
        return float(value) if "." in str(value) else int(value)
    except (ValueError, TypeError):
        raise ValueError(f"Invalid numeric input: {value!r}")

def add(a, b):
    return _to_number(a) + _to_number(b)

def subtract(a, b):
    return _to_number(a) - _to_number(b)

def multiply(a, b):
    return _to_number(a) * _to_number(b)

def divide(a, b):
    a_num, b_num = _to_number(a), _to_number(b)
    if b_num == 0:
        raise ZeroDivisionError("Division by zero is not allowed")
    return a_num / b_num


if __name__ == "__main__":
    print("Simple Calculator")

    try:
        x = input("Enter first number: ")
        y = input("Enter second number: ")

        print("\nChoose operation:")
        print("1- Addition", "2- Subtraction", "3- Multiplication", "4- Division", sep="\n")
        op = input("Operation: ")

        if op in ("1", "Addition"):
            print("Result:", add(x, y))
        elif op in ("2", "Subtraction"):
            print("Result:", subtract(x, y))
        elif op in ("3", "Multiplication"):
            print("Result:", multiply(x, y))
        elif op in ("4", "Division"):
            print("Result:", divide(x, y))
        else:
            print("Invalid operation")

    except ValueError as ve:
        print("Input Error:", ve)
    except ZeroDivisionError as zde:
        print("Math Error:", zde)
    except Exception as e:
        print("Unexpected Error:", e)
