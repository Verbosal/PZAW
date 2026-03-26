PORT=1337
SECRET=\"$(cat /dev/random | tr -cd "[:graph:]" | head -c64)\"
PEPPER=\"$(cat /dev/random | tr -cd "[:xdigit:]" | head -c64)\"n