# src/word_counter.py
import re
from typing import Union


def count_words(text: Union[str, None]) -> int:
    """
    Count words in a given text, ignoring punctuation.
    Example:
        "Hello, world!" -> 2
    """
    if not isinstance(text, str):
        raise ValueError(f"Invalid input, expected string but got {type(text).__name__}")
    if not text.strip():
        return 0

    # \b\w+\b matches whole words (alphanumeric + underscore), ignores punctuation
    words = re.findall(r"\b\w+\b", text)
    return len(words)


if __name__ == "__main__":
    try:
        text = input("Enter a sentence: ")
        print("Word count:", count_words(text))
    except ValueError as ve:
        print("Input Error:", ve)
    except Exception as e:
        print("Unexpected Error:", e)
