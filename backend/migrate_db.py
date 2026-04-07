"""
One-time migration script to add new columns to the quotes table.
Run this ONCE with: python migrate_db.py
"""
import sqlite3
import os

DB_PATH = "tilluworks.db"

def migrate():
    if not os.path.exists(DB_PATH):
        print(f"❌ Database not found at: {DB_PATH}")
        return

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Get current columns
    cursor.execute("PRAGMA table_info(quotes)")
    existing_cols = {row[1] for row in cursor.fetchall()}
    print(f"📋 Existing columns: {existing_cols}")

    # Define new columns to add
    new_columns = [
        ("metadata_info",    "TEXT"),
        ("total_price",      "REAL DEFAULT 0.0"),
        ("design_file_path", "VARCHAR(500)"),
        ("data_file_path",   "VARCHAR(500)"),
    ]

    added = []
    for col_name, col_type in new_columns:
        if col_name not in existing_cols:
            sql = f"ALTER TABLE quotes ADD COLUMN {col_name} {col_type}"
            cursor.execute(sql)
            added.append(col_name)
            print(f"  ✅ Added column: {col_name}")
        else:
            print(f"  ⏭️  Column already exists: {col_name}")

    conn.commit()
    conn.close()

    if added:
        print(f"\n🎉 Migration complete! Added {len(added)} column(s): {', '.join(added)}")
    else:
        print("\n✅ Database already up to date. No changes needed.")

if __name__ == "__main__":
    migrate()
