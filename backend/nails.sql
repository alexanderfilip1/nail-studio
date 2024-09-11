CREATE DATABASE nails;
USE nails;
CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE prices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    price INT NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE,
    category_id INT,
    required_time INT,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    balance INT NOT NULL DEFAULT 0,
    admin TINYINT NOT NULL DEFAULT 0,
    appointments INT NOT NULL DEFAULT 0,
    phone VARCHAR(20) NOT NULL DEFAULT '0',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users (id, username, email, password) VALUES (0, 'guest', 'guest@guest.com', 'Guest1');

CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    start_datetime DATETIME NOT NULL,
    user_id int ,
    FOREIGN KEY (user_id) REFERENCES users(id),
    end_datetime DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE appointments;


CREATE TABLE appointment_services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    appointment_id INT,
    service_id INT,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id),
    FOREIGN KEY (service_id) REFERENCES prices(id)
);

SELECT * FROM appointments;


INSERT INTO category (name) VALUES
    ('manichiura'),
    ('pedichiura');

INSERT INTO prices (price, name, required_time, category_id) VALUES
    (145, 'Constructie simpla 1-3', 120, 1),
    (120, 'Intretinere gel', 120, 1),
    (110, 'Manichiura semi', 120, 1),
    (155, 'Constructie Slim', 60, 1),
    (50, 'French glass, french interior', 120, 1),
    (15, 'Protezare unghie', 60, 2),
    (115, 'Construcție', 120, 2);
    
INSERT INTO prices (price, name, required_time, category_id) VALUES
    (145, 'Test', 30, 1);
    
SELECT * FROM users;


INSERT INTO appointments (name, phone, start_datetime, end_datetime) VALUES
    ('Alexandru Filip', '066436464', '2024-08-21 13:30:00', '2024-08-21 15:30:00');


SELECT * FROM appointments;

DELETE FROM appointments WHERE id = 19;

SELECT * FROM users;
DELETE FROM appointments WHERE id > 0;
DELETE FROM appointment_services WHERE id > 0;


ALTER TABLE appointments
ADD COLUMN total_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
ADD COLUMN cashback_used DECIMAL(10, 2) NOT NULL DEFAULT 0;

DESCRIBE appointment_services;

CREATE TABLE cashback_usage (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  appointment_id INT NOT NULL,
  cashback_used DECIMAL(10, 2) NOT NULL,
  operation VARCHAR(255) NOT NULL,
  usage_date DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (appointment_id) REFERENCES appointments(id)
);


SELECT * FROM appointments;

CREATE TABLE reviews (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    review_text VARCHAR(255) NOT NULL,
    stars int NOT NULL
);

CREATE TABLE gallery_images (
	id INT AUTO_INCREMENT PRIMARY KEY,
    link VARCHAR(255) NOT NULL,
    image_description VARCHAR(255) NOT NULL
);

SELECT * FROM gallery_images;

DELETE FROM gallery_images WHERE id > 0;

CREATE TABLE visits (
    id SERIAL PRIMARY KEY,
    ip_address VARCHAR(45),
    visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users
ADD COLUMN reset_token VARCHAR(255) DEFAULT NULL,
ADD COLUMN reset_token_expires DATETIME DEFAULT NULL;

