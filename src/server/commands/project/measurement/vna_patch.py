from rohdeschwarz.instruments.vna.channel import Channel

def ports_used(self):
    result = []
    for t_name in self.traces:
        t = self._vna.trace(t_name)
        ports = t.test_ports()
        for i in ports:
            if not i in result:
                result.append(i)
    return sorted(result)
Channel.ports_used = ports_used

nothing = None
