import sqlite3

def init_db():
    conn = sqlite3.connect('poker_stats.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS player_stats (player_id TEXT, stats TEXT)''')
    conn.commit()
    conn.close()

def save_player_stats(stats):
    conn = sqlite3.connect('poker_stats.db')
    c = conn.cursor()
    c.execute("INSERT INTO player_stats (player_id, stats) VALUES (?, ?)", (stats['player_id'], stats['stats']))
    conn.commit()
    conn.close()

def get_player_stats(player_id):
    conn = sqlite3.connect('poker_stats.db')
    c = conn.cursor()
    c.execute("SELECT stats FROM player_stats WHERE player_id=?", (player_id,))
    stats = c.fetchone()
    conn.close()
    return stats