from common import *


def register(char_to_letter):
    char_to_letter['А'] = Letter(
        lambda x: Eq((y + 4 * Abs(x) - 1) * (y + S(1) / 4) * sqrt(S(1 + eps - y - 4 * Abs(x)) / (1 - Abs(y))), 0),
        size=1
    )
