def limit_str_for_trace(t):
    if not t.limits.on:
        return None
    if t.limits.passed:
        return 'passed'
    else:
        return 'failed'

def global_limit_for(limit_strs):
    if 'failed' in limit_strs:
        return 'failed'
    if 'passed' in limit_strs:
        return 'passed'
    # else
    return None
