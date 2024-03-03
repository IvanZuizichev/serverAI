import string

text = "naked, girl"

text = text.lower()
print([text := text.replace(e, "") for e in string.punctuation][-1])
print(text)
