# IEEE 488.2 Block Data Format

# transfer size requirement:
# len(str(data)) <= 9
MAX_SUPPORTED_SIZE = 10**9 - 1

def to_block_data_format(data):
    assert type(data) == bytes,        'data must be bytes!'
    size     = len(data)
    assert size < MAX_SUPPORTED_SIZE, f'Maximum supported data size is {MAX_SUPPORTED_SIZE}. len(data) => {size}.'
    size_len = len(str(size))
    header   = f'#{size_len}{size}'.encode();
    return header + data
