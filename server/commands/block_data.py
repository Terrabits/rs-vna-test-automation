# IEEE 488.2 Block Data Format

# transfer size requirement:
# len(str(data)) <= 9
MAX_SUPPORTED_SIZE = 10**9 - 1

def header_for(size):
    assert size < MAX_SUPPORTED_SIZE
    size_str_len = len(str(size))
    return f"#{len(str(size))}{size}".encode()
def to_block_data_format(data):
    assert type(data) == bytes
    return header_for(len(data)) + data
