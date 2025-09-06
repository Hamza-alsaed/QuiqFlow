def count_words(text):
    words = text.split()
    return len(words)


if __name__ == "__main__":
    text = input("Enter a sentence: ")
    print("Word count:", count_words(text))
