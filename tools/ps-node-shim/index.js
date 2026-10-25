const { execFile } = require('child_process');

// Finds processes whose command line matches opts.command and opts.arguments.
function lookup(opts, cb) {
  if (process.platform !== 'win32') {
    return execFile('ps', opts.psargs || ['-A', '-o', 'pid,args'], (err, out) => {
      if (err) return cb(err);
      const list = out.split('\n').map(l => l.trim().match(/^(\d+)\s+(.*)$/)).filter(Boolean)
        .map(m => ({ pid: m[1], command: m[2].split(' ')[0], arguments: m[2].split(' ').slice(1) }))
        .filter(p => (!opts.command || p.command.includes(opts.command)) &&
          (!opts.arguments || p.arguments.join(' ').includes(opts.arguments)));
      cb(null, list);
    });
  }
  const ps = 'Get-CimInstance Win32_Process | Select-Object ProcessId,CommandLine | ConvertTo-Json -Compress';
  execFile('powershell', ['-NoProfile', '-Command', ps], { maxBuffer: 1 << 26 }, (err, out) => {
    if (err) return cb(err);
    let rows = [];
    try { rows = [].concat(JSON.parse(out || '[]')); } catch (e) { return cb(e); }
    const list = rows.filter(r => r.CommandLine)
      .map(r => ({ pid: String(r.ProcessId), command: r.CommandLine, arguments: [r.CommandLine] }))
      .filter(p => (!opts.command || p.command.includes(opts.command)) &&
        (!opts.arguments || p.command.includes(opts.arguments)));
    cb(null, list);
  });
}

function kill(pid, cb) {
  try { process.kill(Number(pid)); } catch (e) { if (cb) return cb(e); return; }
  if (cb) cb(null, pid);
}

module.exports = { lookup, kill };
