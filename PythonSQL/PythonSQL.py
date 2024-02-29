import sqlite3
import pandas as pd
import matplotlib.pyplot as plt

def connect_to_db(db_file):
    """Establishes a connection to the database."""
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except sqlite3.Error as e:
        print(e)
        return None

def create_sample_data(conn):
    """Creates tables and inserts sample data."""
    create_products_table = """
        CREATE TABLE IF NOT EXISTS products (
            product_id INTEGER PRIMARY KEY,
            name TEXT,
            category TEXT,
            price REAL
        );
    """

    create_orders_table = """
        CREATE TABLE IF NOT EXISTS orders (
            order_id INTEGER PRIMARY KEY,
            date TEXT,
            customer_id INTEGER
        );
    """

    create_order_items_table = """
        CREATE TABLE IF NOT EXISTS order_items (
            item_id INTEGER PRIMARY KEY,
            order_id INTEGER,
            product_id INTEGER,
            quantity INTEGER,
            FOREIGN KEY (order_id) REFERENCES orders (order_id),
            FOREIGN KEY (product_id) REFERENCES products (product_id)
        );
    """

    insert_sample_data = """
        INSERT INTO products (name, category, price) VALUES
            ('ProductA', 'CategoryA', 10.99),
            ('ProductB', 'CategoryB', 20.49),
            ('ProductC', 'CategoryA', 15.99);

        INSERT INTO orders (date, customer_id) VALUES
            ('2023-01-01', 1),
            ('2023-02-01', 2);

        INSERT INTO order_items (order_id, product_id, quantity) VALUES
            (1, 1, 2),
            (1, 2, 1),
            (2, 3, 3);
    """

    cursor = conn.cursor()
    cursor.execute(create_products_table)
    cursor.execute(create_orders_table)
    cursor.execute(create_order_items_table)
    cursor.executescript(insert_sample_data)
    conn.commit()
    
def get_top_products(conn, n=5):
    """Retrieves the top-selling products."""
    query = """
        SELECT p.name, SUM(oi.quantity * p.price) AS total_sales
        FROM order_items oi
        JOIN products p ON oi.product_id = p.product_id
        GROUP BY p.product_id
        ORDER BY total_sales DESC
        LIMIT ?; 
    """
    cursor = conn.cursor()
    cursor.execute(query, (n,))
    return cursor.fetchall()

def get_sales_by_month(conn):
    """Calculates monthly sales totals."""
    query = """
        SELECT strftime('%Y-%m', o.date) AS month, SUM(oi.quantity * p.price) AS total_sales
        FROM orders o
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN products p ON oi.product_id = p.product_id
        GROUP BY month
        ORDER BY month;
    """
    cursor = conn.cursor()
    cursor.execute(query)
    return cursor.fetchall()

if __name__ == '__main__':
    db_file = ":memory:"  # Adjust for your database file
    conn = connect_to_db(db_file)

    if conn:
        # Create sample data
        create_sample_data(conn)

        # Get top products
        top_products = get_top_products(conn)
        print("Top 5 Selling Products:")
        for product, sales in top_products:
            print(f"{product}: ${sales:.2f}")

        # Analyze monthly sales
        monthly_sales = get_sales_by_month(conn)
        df_sales = pd.DataFrame(monthly_sales, columns=['month', 'total_sales'])
        df_sales['month'] = pd.to_datetime(df_sales['month'])
        df_sales.set_index('month', inplace=True)

        print("\nMonthly Sales:")
        for index, row in df_sales.iterrows():
            print(f"{index.strftime('%Y-%m')}: ${row['total_sales']:.2f}")

        # Plot sales trend
        df_sales.plot(kind='line', title='Monthly Sales Trend')
        plt.show()

        conn.close()