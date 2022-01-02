### Steps for putting data into your MySQL database

- Setups for loading files in MySQL
    - If you confront MySQL error 1290
        - Edit your 'my.cnf' file by adding a line below  
        `secure-file-priv = ""`  
    - If you confront MySQL error 3948  
        - Type the line below in mysql terminal  
        `set global local_infile = true`
    - Restart your MySQL server  
    $ mysql.server restart  
    
- Putting csv files into tables  
    ~~~mysql
    LOAD DATA LOCAL INFILE " 'your_path_to_csv_file' " INTO TABLE 'your_db_name'.'your_table.name'    
    FIELDS TERMINATED BY ','  
    LINES TERMINATED BY '\n'  
    IGNORE 1 LINES ;
    ~~~
