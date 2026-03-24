-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 08, 2025 at 10:25 AM
-- Server version: 11.8.3-MariaDB-log
-- PHP Version: 7.2.34
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS property_comment_likes;
DROP TABLE IF EXISTS property_comments;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS chats;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS password_reset_tokens;
DROP TABLE IF EXISTS personal_access_tokens;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS cities;
DROP TABLE IF EXISTS governorates;
DROP TABLE IF EXISTS countries;
DROP TABLE IF EXISTS contact_requests;
DROP TABLE IF EXISTS cache;
DROP TABLE IF EXISTS cache_locks;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS menu_items;
DROP TABLE IF EXISTS migrations;
DROP TABLE IF EXISTS users;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u735452695_3qaraty`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `party_size` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `status` enum('pending','confirmed','rejected','cancelled') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('3qaraty_cacheproperty_viewed_11_guest_4vaT8ZZScsv862AQXdCCGTcIS6VSuF4RhFRRfh2I', 'b:1;', 1762630117),
('3qaraty_cacheproperty_viewed_11_guest_C85FhPrcRouY75Cdp7YA0PX8qGFiMvXzLAAgv1wJ', 'b:1;', 1762630073),
('3qaraty_cacheproperty_viewed_13_guest_p6d60vEKeIQpbEG6TrIPF6i8JZBgu3Eb2m2J80em', 'b:1;', 1762631468),
('3qaraty_cacheproperty_viewed_15_guest_5KSslCiuJhy0TVLdKH7vyAXd5WOoBexZLGUBSzrD', 'b:1;', 1762638456),
('3qaraty_cacheproperty_viewed_15_guest_85vLPLLC137zEmjC1UxDacAw2EgNKPUgqk0dqUrf', 'b:1;', 1762633092),
('3qaraty_cacheproperty_viewed_15_guest_90X0HZGRdOLSdd3hIiqNIWRBals5qldicow31bjM', 'b:1;', 1762633798),
('3qaraty_cacheproperty_viewed_15_guest_dH8Z9Y1eYViutNLnvKJAvCsjlK6SAC1lnEhIjzGf', 'b:1;', 1762630595),
('3qaraty_cacheproperty_viewed_15_guest_fArQvyazkXaFO3VUoTIqAFg0gv2QntUtW1PNELmU', 'b:1;', 1762638258),
('3qaraty_cacheproperty_viewed_15_guest_KzOaaGN97aFHZtFTnMaxedlVpycX4Qu3VCcgHU4O', 'b:1;', 1762638318),
('3qaraty_cacheproperty_viewed_15_guest_ntw1dEUQ1N2pGDkQdF88Do4VZQsRpZqkgXau3uWb', 'b:1;', 1762631886),
('3qaraty_cacheproperty_viewed_15_guest_P6t2Jo4Xpy10Ey0ACvGpODMYGBaxFcxiPmlvJtjE', 'b:1;', 1762638446),
('3qaraty_cacheproperty_viewed_16_guest_2ChWw0x1LqG6olfbCQu5LWnIVh7DUW35aEUT3GFu', 'b:1;', 1762630672),
('3qaraty_cacheproperty_viewed_17_guest_nFCxkc8gd0WEVHhnN9LI6Vg9CD4mqHkNZOmXGGQ1', 'b:1;', 1762631340),
('3qaraty_cacheproperty_viewed_20_guest_0ZpAo3uRV0BnFr6utgYvbsz7x0gibOAzqqBdvNXw', 'b:1;', 1762631822),
('3qaraty_cacheproperty_viewed_20_guest_ykKoro2jQ5aAgjXhwD6ySYoBtpbCKcZeY9Iw2DTu', 'b:1;', 1762631892),
('3qaraty_cacheproperty_viewed_21_guest_0mR3PrFyhnRW5jAY1MIsvXVv0U5JHBqJOizHVmGH', 'b:1;', 1762638461),
('3qaraty_cacheproperty_viewed_21_guest_0qhGFdofPJYy741F2Z70BKYHzz3BO2NMjlE0POPe', 'b:1;', 1762638245),
('3qaraty_cacheproperty_viewed_21_guest_5CF6lT0ZnRpn1YdDQDdXxOUezQpDIXfqt3DplanB', 'b:1;', 1762638249),
('3qaraty_cacheproperty_viewed_21_guest_8TJBNw3Bh0Tm66VUqDYUOW3SIO3W53UtmuDs1LU9', 'b:1;', 1762633772),
('3qaraty_cacheproperty_viewed_21_guest_onhLV5DLg3trQjzXyoRa0RjM1HOLuqSuK5oVl7qy', 'b:1;', 1762632065),
('3qaraty_cacheproperty_viewed_21_guest_OuDxIbgxiTlE6eRm0GN1aVXX5fzCUyRmcnTGkBWH', 'b:1;', 1762632182),
('3qaraty_cacheproperty_viewed_21_guest_t7YmyEpo2oPfYQfd7B3Oz7Xe5XS3yIlDiquJQmHD', 'b:1;', 1762638300),
('3qaraty_cacheproperty_viewed_21_guest_TBK2Q7xL0BlsokBnMbKLcvrNRxOd07tmIZwXM9Xp', 'b:1;', 1762632203),
('3qaraty_cacheproperty_viewed_21_guest_UirOqQ3gOxjUkqUoxFKctQzOW7MpwTGIxwIxYPXa', 'b:1;', 1762632069),
('3qaraty_cacheproperty_viewed_22_guest_FC6yIhFMfHi3jtkI48MRtWPLy3S1UFjDvzbe4XUo', 'b:1;', 1762632293),
('3qaraty_cacheproperty_viewed_22_guest_lbCw5ldILRPN7Kals2mWhq9ixGZcHEXF5pvpAFWc', 'b:1;', 1762632585),
('3qaraty_cacheproperty_viewed_22_guest_qynynrmDDpefTyBpaH6D6emVvOmGpcOBkVcYaLum', 'b:1;', 1762632272),
('3qaraty_cacheproperty_viewed_23_guest_uCyElr4OPdemTyrecHNi0FL72idv6I7OJCD68PyC', 'b:1;', 1762632331),
('3qaraty_cacheproperty_viewed_24_guest_qqW9C8ngDCbR59OISYDsf1Q2g5LnHZJAaM9pno1c', 'b:1;', 1762632657),
('3qaraty_cacheproperty_viewed_24_guest_xF06IiQ4Cdd83aStW8O9vxv48kKBw3UUUQU74CEt', 'b:1;', 1762632805),
('3qaraty_cacheproperty_viewed_25_guest_1u5uVFxEAUlXOra0kP4MV0UPCXppPkBEvIbqXUS4', 'b:1;', 1762632849),
('3qaraty_cacheproperty_viewed_25_guest_pot21UQTl4y3ioH6Hxqonb84EHLs0lsIt8vDLjtZ', 'b:1;', 1762638238),
('3qaraty_cacheproperty_viewed_25_guest_whzXDkUJS5Nr33NOqoXuD9ki1WFrCRbPitni9j1z', 'b:1;', 1762633778),
('3qaraty_cacheproperty_viewed_26_guest_033c9CXYh2PSd0k83uU6X0lzUVB39slfWdKBSxOn', 'b:1;', 1762633841),
('3qaraty_cacheproperty_viewed_26_guest_34odP4qe8663xwxbzDzoFKcZVaXzmgra3RSk8SQ5', 'b:1;', 1762632898),
('3qaraty_cacheproperty_viewed_26_guest_bfTWHbB1ycHKOxEv5X0wF3vEROIholFdohGTcMMp', 'b:1;', 1762633786),
('3qaraty_cacheproperty_viewed_26_guest_fwl5WWaH8KZgFAqJ8iLmW0Ik5LkANdc8UYOUEbhM', 'b:1;', 1762635308),
('3qaraty_cacheproperty_viewed_26_guest_G812vKJriDXjjylE56Ym5ocSrEXKogJz4ykQboFW', 'b:1;', 1762635327),
('3qaraty_cacheproperty_viewed_26_guest_Hr2a2JuPFk7GDJW3x5q66odXkrtSUSBFmzBVDTwL', 'b:1;', 1762639646),
('3qaraty_cacheproperty_viewed_26_guest_I2K5q7Y8FzTs3w2t1WibeeljDHLSdIeMuccN1n01', 'b:1;', 1762633086),
('3qaraty_cacheproperty_viewed_26_guest_iZCWrmX2VNG0lSmGeXdTY62J4l06f5YFs7PYJdQy', 'b:1;', 1762637726),
('3qaraty_cacheproperty_viewed_26_guest_JuJWsYuTm6lXjnaWtq4rTOqJ9F716o5lcman03VP', 'b:1;', 1762638229),
('3qaraty_cacheproperty_viewed_26_guest_kUZwjFNXd8dQKTy55jHptFm208brreLSX9Hwjhi0', 'b:1;', 1762635781),
('3qaraty_cacheproperty_viewed_26_guest_NkLdYzteiU5RrdO2D7Pp2roaMTyJzeUTPhDZLSeW', 'b:1;', 1762639512),
('3qaraty_cacheproperty_viewed_26_guest_tOX25d8m88qGDRzRA9NJ9WyVd3KkGXDq0DQ87aNB', 'b:1;', 1762634860),
('3qaraty_cacheproperty_viewed_26_guest_UGsqTREwnvM1AWLy3pEzcga5ngyoA4nD3p01z9Am', 'b:1;', 1762636233),
('3qaraty_cacheproperty_viewed_26_guest_YPujoJAEEntMFfXJ3nx0egKU9EJoVVxhYI1Cw8nM', 'b:1;', 1762638756),
('3qaraty_cacheproperty_viewed_27_guest_8oBBGzDI654ZhMCBUoji1bGddml5mM6TJNnB4VTh', 'b:1;', 1762634868),
('3qaraty_cacheproperty_viewed_27_guest_9Bni0OeINIRMQhE2lVJdtIgsVLpSkM2yu6kKyihH', 'b:1;', 1762633077),
('3qaraty_cacheproperty_viewed_27_guest_9Zoyi6WJdBWUSi9MYuzpAeSrdLJ4F1kBEj1Iegqe', 'b:1;', 1762633884),
('3qaraty_cacheproperty_viewed_27_guest_avJny8cUeW2rFxUIzsQQJmA9vjS6DxJ1jL7YBIa7', 'b:1;', 1762636561),
('3qaraty_cacheproperty_viewed_27_guest_ceYPBkGZPUiwTf1WHrJAKzcGbv5UnaoKaTva9kNc', 'b:1;', 1762635318),
('3qaraty_cacheproperty_viewed_27_guest_evUX1DjTtdAFVt7B2GTrE8JQEtNoIKlUD3wSXswj', 'b:1;', 1762638263),
('3qaraty_cacheproperty_viewed_27_guest_LplAyhLLNqpUkrnMkaBHe1g09bsXN2p7CnIbT5Oc', 'b:1;', 1762633765),
('3qaraty_cacheproperty_viewed_27_guest_Ob5yBx6Gib50TfimtQsjtSDabuL4DgpPl9jvEwhC', 'b:1;', 1762634035),
('3qaraty_cacheproperty_viewed_27_guest_UB8ku8EsDP25fpAsbEFfiieBrIwJLRtyeNELFMnM', 'b:1;', 1762638224),
('3qaraty_cacheproperty_viewed_27_guest_VvgKtqhiyb0cN64FsF5j0lDquiNqxJ7WJZLbXY0e', 'b:1;', 1762633758),
('3qaraty_cacheproperty_viewed_27_guest_WSdaqI7Rt9qQe46xlYfYoNINhFrWSdgmltrFtZma', 'b:1;', 1762638449),
('3qaraty_cacheproperty_viewed_27_guest_yDj9F6VLHDqnEe0zpDhiwQ293ItxQ5sAZAZRHZD9', 'b:1;', 1762639501),
('3qaraty_cacheproperty_viewed_28_guest_jEmfxBi4zmppWI2CqnWamW1uAu8uNIVgDXVsQHrt', 'b:1;', 1762633978),
('3qaraty_cacheproperty_viewed_28_guest_sF7LeNSRDK8uRix0Ull60g2lTfW0ohCPkIb9U0ay', 'b:1;', 1762633724),
('3qaraty_cacheproperty_viewed_28_guest_tAuisGwmu7wE5cUMQoAxxb2bqEig9vvOe19r7Q7q', 'b:1;', 1762633070),
('3qaraty_cacheproperty_viewed_28_guest_UnLs9RMUfQ4SaKvWQMQwyoMZkPWGNioE9AhbSPYC', 'b:1;', 1762638209),
('3qaraty_cacheproperty_viewed_28_guest_ZhgOg3wvzVXgio9LVsix9kUJgbJuPMbdMvvYbi8U', 'b:1;', 1762639604),
('3qaraty_cacheproperty_viewed_29_guest_1kwyloDP30Lanynn5cVsp44Oa098sHuynZS2eb5W', 'b:1;', 1762633891),
('3qaraty_cacheproperty_viewed_29_guest_46BqUaxpjh5hU8O9TTRtMQH756QmzjhU2eCsafJL', 'b:1;', 1762637380),
('3qaraty_cacheproperty_viewed_29_guest_5iJExwPMi5KL81f1QoADTgt6XQEGyQwryqhF26qG', 'b:1;', 1762639491),
('3qaraty_cacheproperty_viewed_29_guest_Byswv621mBId5xxfVDeIzaNHZlYjTcaKckPUopwB', 'b:1;', 1762633751),
('3qaraty_cacheproperty_viewed_29_guest_DryiEXvZUlbsovsKG8TwnLwRYUCrhj8BYxnuGmTq', 'b:1;', 1762636601),
('3qaraty_cacheproperty_viewed_29_guest_ElTeFUJ0yY6ge9jKidH81iRQun84xG3j9Qp6YlPD', 'b:1;', 1762633745),
('3qaraty_cacheproperty_viewed_29_guest_IG4jCvz3XOZ8owO5bjCkI0aczE9BZLodinJQhEIB', 'b:1;', 1762635336),
('3qaraty_cacheproperty_viewed_29_guest_JDPRIHV8vajgd3aDowYTVC4xgBcaGPQ3GqCqwgJL', 'b:1;', 1762633463),
('3qaraty_cacheproperty_viewed_29_guest_Km9RSkkjrPFkqneVQimIvRGladk6bqvA5vE6Rc2S', 'b:1;', 1762635614),
('3qaraty_cacheproperty_viewed_29_guest_pXJjaWO4Uquc6m8F9ULCqn7BNGLsntX4ijdS5mFT', 'b:1;', 1762638206),
('3qaraty_cacheproperty_viewed_29_guest_QfQuor4ekIxoUCdGZFKT7mzznic2k8n8uBnEY2i3', 'b:1;', 1762638201),
('3qaraty_cacheproperty_viewed_29_guest_QIgsvH8Fx50Jy8RmUhNxvN4Cn0MABGkwJLcvamzL', 'b:1;', 1762633326),
('3qaraty_cacheproperty_viewed_29_guest_QQ7zR1EgCmZbgqbFxy7qCtpXdd3S6fZFNteI2FSC', 'b:1;', 1762633053),
('3qaraty_cacheproperty_viewed_29_guest_XkW7JgfBxbapaZzQTidypRR9B5EXOrzGl0WIfp5L', 'b:1;', 1762633846),
('3qaraty_cacheproperty_viewed_4_guest_8h4OX3S7447D2EX2ESIw2Lug1lELegaatB9TJIZV', 'b:1;', 1762627981),
('3qaraty_cacheproperty_viewed_4_guest_a7k0Cg4z8Gp5K4p2NrW9HFbGHWLnp158hXQjSHYW', 'b:1;', 1762628737),
('3qaraty_cacheproperty_viewed_4_guest_GXFCCyW2cHUeaWdBqyzIlYgNKvFlZoep8wZPWhGs', 'b:1;', 1762627374),
('3qaraty_cacheproperty_viewed_4_guest_IP5T3ybBowMXl3aJj9sUkbwriObqnwrUMIqs0uem', 'b:1;', 1762627799),
('3qaraty_cacheproperty_viewed_4_guest_jXOe8ZiipkVIVX2qxxaaR6HXGI8ZaGDdwz0g0RRe', 'b:1;', 1762596518),
('3qaraty_cacheproperty_viewed_4_guest_m2ymKEyIUF8BKlUNEAoMApSCUn1XJdgbUXMd5lvY', 'b:1;', 1762595542),
('3qaraty_cacheproperty_viewed_4_guest_mJjwL88Co49BKTThRpaDFQ4JPfigTrXyABNmx2P5', 'b:1;', 1762596516),
('3qaraty_cacheproperty_viewed_4_guest_U6NzuVdnJJLCLicRhuNoCCh1MQZQEZEydErIqexC', 'b:1;', 1762595650),
('3qaraty_cacheproperty_viewed_4_guest_UKtRb3TOzxKjs04jYTP8cB1p7VDsyZAXluv6S0EE', 'b:1;', 1762628140),
('3qaraty_cacheproperty_viewed_4_guest_xV43GnfD0ETei3zW71aQzT9PhAgLT9LXbp82qsAQ', 'b:1;', 1762628113),
('3qaraty_cacheproperty_viewed_4_guest_Y6hFOZfkvAcmFqbKAXvbOtLYbYIPrJxRYhF6O686', 'b:1;', 1762596150),
('3qaraty_cacheproperty_viewed_4_guest_YQaNM6lzqnAjgHGheORNIqOEtDqowKPff6kaZumH', 'b:1;', 1762595521),
('3qaraty_cacheproperty_viewed_5_guest_7D0gu2ZWAy0t2yas5r6KmkH8cjosKGSu3NeaYLNB', 'b:1;', 1762628107),
('3qaraty_cacheproperty_viewed_5_guest_RE02hxqP3l0TWZv7Jlsx1BwNhn8VHPhDxFoqz3ii', 'b:1;', 1762596536),
('3qaraty_cacheproperty_viewed_5_guest_uBmjpYXSiWiS5rYDcw8Hk7lzK2fofNYaf6CHPwYW', 'b:1;', 1762596787),
('3qaraty_cacheproperty_viewed_7_guest_9DrgxLL9IxjgNTpTAUq5m442qs422nuh0LOdYvwU', 'b:1;', 1762628565),
('3qaraty_cacheproperty_viewed_7_guest_OM2PsS2m4BhMpSdLddYRuHzSFMzYdX6eUDzKf6eE', 'b:1;', 1762628588),
('3qaraty_cacheproperty_viewed_7_guest_rdJ9rIsTfURMkjspfJCEm8sx8MOSkotRPEbYUBAL', 'b:1;', 1762629045),
('3qaraty_cacheproperty_viewed_7_guest_VZwDIs6KMYjv1RKcUnsh6Ziihq6hhLO246X66YB1', 'b:1;', 1762628872),
('3qaraty_cacheproperty_viewed_8_guest_4fcw1sxKCTn3LFQsgofY38cVzXAE7qSPyrssHUIy', 'b:1;', 1762628698),
('3qaraty_cacheproperty_viewed_8_guest_7xKg8JoD4FzKhsyJXtrJ7XzQSeKOh6LENRdet5Mp', 'b:1;', 1762628516),
('3qaraty_cacheproperty_viewed_8_guest_vjMqL1NF3V2rVdkhLlrz9Mwk3ubjACvQiPoFBGCJ', 'b:1;', 1762628491);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sender_id` bigint(20) UNSIGNED NOT NULL,
  `receiver_id` bigint(20) UNSIGNED NOT NULL,
  `property_id` bigint(20) UNSIGNED DEFAULT NULL,
  `message` text NOT NULL,
  `message_type` enum('text','image','document') NOT NULL DEFAULT 'text',
  `attachment_path` varchar(255) DEFAULT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `read_at` timestamp NULL DEFAULT NULL,
  `deleted_by_sender` tinyint(1) NOT NULL DEFAULT 0,
  `deleted_by_receiver` tinyint(1) NOT NULL DEFAULT 0,
  `is_admin_message` tinyint(1) NOT NULL DEFAULT 0,
  `is_system_message` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`id`, `sender_id`, `receiver_id`, `property_id`, `message`, `message_type`, `attachment_path`, `is_read`, `read_at`, `deleted_by_sender`, `deleted_by_receiver`, `is_admin_message`, `is_system_message`, `created_at`, `updated_at`) VALUES
(1, 3, 2, NULL, 'hi', 'text', NULL, 1, '2025-11-08 10:06:22', 0, 0, 0, 0, '2025-11-08 10:06:17', '2025-11-08 10:06:22'),
(2, 2, 3, NULL, 'hi', 'text', NULL, 1, '2025-11-08 10:06:25', 0, 0, 1, 0, '2025-11-08 10:06:24', '2025-11-08 10:06:25'),
(3, 2, 3, NULL, '{\"type\":\"property_card\",\"data\":{\"id\":28,\"title\":\"carcarcarcarcarcarcarcarcarcarcarcarcar\",\"description\":\"carcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcar\",\"price\":\"2000000.00\",\"location_city\":\"Mohandessin\",\"location_governorate\":\"Giza\",\"rent_or_buy\":\"buy\",\"images\":[\"https://3qaraty.icu/storage/properties/uozZ48u2ZGB7cZFe4Pdw7kA4K6xVqVz6zn6FJ1Xj.png\"],\"category\":\"other\"}}', 'text', NULL, 1, '2025-11-08 10:06:37', 0, 0, 1, 0, '2025-11-08 10:06:35', '2025-11-08 10:06:37');

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `governorate_id` bigint(20) UNSIGNED NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `name_ar` varchar(255) NOT NULL,
  `code` varchar(10) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `governorate_id`, `name_en`, `name_ar`, `code`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 'New Cairo', 'القاهرة الجديدة', 'NC', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(2, 1, 'Maadi', 'المعادي', 'MAD', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(3, 1, 'Heliopolis', 'مصر الجديدة', 'HLP', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(4, 1, 'Downtown', 'وسط البلد', 'DT', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(5, 1, 'Zamalek', 'الزمالك', 'ZAM', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(6, 1, 'Nasr City', 'مدينة نصر', 'NSR', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(7, 1, 'Shubra', 'شبرا', 'SHB', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(8, 1, 'Ain Shams', 'عين شمس', 'ASH', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(9, 1, 'Mokattam', 'المقطم', 'MOK', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(10, 1, 'Rehab City', 'مدينة الرحاب', 'RHB', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(11, 2, 'Sidi Gaber', 'سيدي جابر', 'SG', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(12, 2, 'Stanley', 'ستانلي', 'STN', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(13, 2, 'Montaza', 'المنتزه', 'MTZ', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(14, 2, 'Smouha', 'سموحة', 'SMH', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(15, 2, 'Miami', 'ميامي', 'MIA', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(16, 2, 'Gleem', 'جليم', 'GLM', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(17, 2, 'Sporting', 'سبورتنج', 'SPT', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(18, 2, 'Roushdy', 'رشدي', 'RSH', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(19, 2, 'Cleopatra', 'كليوباترا', 'CLP', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(20, 2, 'San Stefano', 'سان ستيفانو', 'SST', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(21, 3, 'Dokki', 'الدقي', 'DOK', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(22, 3, 'Mohandessin', 'المهندسين', 'MHN', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(23, 3, '6th of October', 'السادس من أكتوبر', '6OCT', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(24, 3, 'Sheikh Zayed', 'الشيخ زايد', 'SZ', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(25, 3, 'Haram', 'الهرم', 'HRM', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(26, 3, 'Faisal', 'فيصل', 'FSL', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(27, 3, 'Agouza', 'العجوزة', 'AGZ', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(28, 3, 'Imbaba', 'إمبابة', 'IMB', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(29, 3, 'Bulaq al-Dakrour', 'بولاق الدكرور', 'BLD', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(30, 3, 'Kerdasa', 'كرداسة', 'KRD', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(31, 4, 'Benha', 'بنها', 'BNH', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(32, 4, 'Shubra al-Khaimah', 'شبرا الخيمة', 'SHK', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(33, 4, 'Qaha', 'قها', 'QHA', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(34, 4, 'Khanka', 'الخانكة', 'KHN', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(35, 4, 'Shibin al-Qanater', 'شبين القناطر', 'SHQ', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(36, 4, 'Tukh', 'طوخ', 'TKH', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(37, 4, 'Kafr Shukr', 'كفر شكر', 'KFS', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(38, 4, 'Obour City', 'مدينة العبور', 'OBR', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(39, 5, 'Port Said', 'بورسعيد', 'PS', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(40, 5, 'Port Fouad', 'بور فؤاد', 'PF', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(41, 5, 'Al-Zohour', 'الزهور', 'ZHR', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(42, 5, 'Al-Manakh', 'المناخ', 'MNK', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(43, 5, 'Al-Arab', 'العرب', 'ARB', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(44, 6, 'Suez', 'السويس', 'SZ', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(45, 6, 'Ain Sokhna', 'العين السخنة', 'ASK', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(46, 6, 'Ataqah', 'العتقة', 'ATQ', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(47, 6, 'Faisal', 'فيصل', 'FSL', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(48, 6, 'Ganayen', 'الجناين', 'GNN', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(49, 7, 'Luxor', 'الأقصر', 'LXR', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(50, 7, 'Esna', 'إسنا', 'ESN', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(51, 7, 'Armant', 'أرمنت', 'ARM', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(52, 7, 'Al-Tod', 'الطود', 'TOD', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(53, 7, 'Al-Qurna', 'القرنة', 'QRN', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(54, 8, 'Aswan', 'أسوان', 'ASW', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(55, 8, 'Kom Ombo', 'كوم أمبو', 'KOM', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(56, 8, 'Edfu', 'إدفو', 'EDF', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(57, 8, 'Daraw', 'دراو', 'DRW', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(58, 8, 'Abu Simbel', 'أبو سمبل', 'ABS', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(59, 9, 'Asyut', 'أسيوط', 'AST', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(60, 9, 'Dayrut', 'ديروط', 'DYR', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(61, 9, 'Qusiya', 'القوصية', 'QUS', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(62, 9, 'Manfalut', 'منفلوط', 'MNF', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(63, 9, 'Abnoub', 'أبنوب', 'ABN', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(64, 10, 'Damanhour', 'دمنهور', 'DMN', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(65, 10, 'Kafr al-Dawwar', 'كفر الدوار', 'KFD', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(66, 10, 'Rashid', 'رشيد', 'RSH', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(67, 10, 'Idku', 'إدكو', 'IDK', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(68, 10, 'Abu al-Matamir', 'أبو المطامير', 'ABM', 1, '2025-11-07 11:39:37', '2025-11-07 11:39:37'),
(84, 30, 'Gleem', 'جليم', 'GLM', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(89, 31, 'Dokki', 'الدقي', 'DOK', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(90, 31, 'Mohandessin', 'المهندسين', 'MHN', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(91, 31, '6th of October', 'السادس من أكتوبر', '6OCT', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(92, 31, 'Sheikh Zayed', 'الشيخ زايد', 'SZ', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(93, 31, 'Haram', 'الهرم', 'HRM', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(94, 31, 'Faisal', 'فيصل', 'FSL', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(95, 31, 'Agouza', 'العجوزة', 'AGZ', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(96, 31, 'Imbaba', 'إمبابة', 'IMB', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(97, 31, 'Bulaq al-Dakrour', 'بولاق الدكرور', 'BLD', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(98, 31, 'Kerdasa', 'كرداسة', 'KRD', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(107, 33, 'Port Said', 'بورسعيد', 'PS', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(108, 33, 'Port Fouad', 'بور فؤاد', 'PF', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(109, 33, 'Al-Zohour', 'الزهور', 'ZHR', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(110, 33, 'Al-Manakh', 'المناخ', 'MNK', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(111, 33, 'Al-Arab', 'العرب', 'ARB', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(112, 34, 'Suez', 'السويس', 'SZ', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(113, 34, 'Ain Sokhna', 'العين السخنة', 'ASK', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(114, 34, 'Ataqah', 'العتقة', 'ATQ', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(115, 34, 'Faisal', 'فيصل', 'FSL', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(116, 34, 'Ganayen', 'الجناين', 'GNN', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(117, 35, 'Luxor', 'الأقصر', 'LXR', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(118, 35, 'Esna', 'إسنا', 'ESN', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(119, 35, 'Armant', 'أرمنت', 'ARM', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(120, 35, 'Al-Tod', 'الطود', 'TOD', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(121, 35, 'Al-Qurna', 'القرنة', 'QRN', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(122, 36, 'Aswan', 'أسوان', 'ASW', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(123, 36, 'Kom Ombo', 'كوم أمبو', 'KOM', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(124, 36, 'Edfu', 'إدفو', 'EDF', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(125, 36, 'Daraw', 'دراو', 'DRW', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(126, 36, 'Abu Simbel', 'أبو سمبل', 'ABS', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(127, 37, 'Asyut', 'أسيوط', 'AST', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(128, 37, 'Dayrut', 'ديروط', 'DYR', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(129, 37, 'Qusiya', 'القوصية', 'QUS', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(130, 37, 'Manfalut', 'منفلوط', 'MNF', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(131, 37, 'Abnoub', 'أبنوب', 'ABN', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(132, 38, 'Damanhour', 'دمنهور', 'DMN', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(133, 38, 'Kafr al-Dawwar', 'كفر الدوار', 'KFD', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(134, 38, 'Rashid', 'رشيد', 'RSH', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(135, 38, 'Idku', 'إدكو', 'IDK', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(136, 38, 'Abu al-Matamir', 'أبو المطامير', 'ABM', 1, '2025-11-07 11:43:47', '2025-11-07 11:43:47'),
(137, 57, 'New Cairo', 'القاهرة الجديدة', 'NC', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(138, 57, 'Maadi', 'المعادي', 'MAD', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(139, 57, 'Heliopolis', 'مصر الجديدة', 'HLP', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(140, 57, 'Downtown', 'وسط البلد', 'DT', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(141, 57, 'Zamalek', 'الزمالك', 'ZAM', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(142, 57, 'Nasr City', 'مدينة نصر', 'NSR', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(143, 57, 'Shubra', 'شبرا', 'SHB', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(144, 57, 'Ain Shams', 'عين شمس', 'ASH', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(145, 57, 'Mokattam', 'المقطم', 'MOK', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(146, 57, 'Rehab City', 'مدينة الرحاب', 'RHB', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(147, 58, 'Sidi Gaber', 'سيدي جابر', 'SG', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(148, 58, 'Stanley', 'ستانلي', 'STN', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(149, 58, 'Montaza', 'المنتزه', 'MTZ', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(150, 58, 'Smouha', 'سموحة', 'SMH', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(151, 58, 'Miami', 'ميامي', 'MIA', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(152, 58, 'Gleem', 'جليم', 'GLM', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(153, 58, 'Sporting', 'سبورتنج', 'SPT', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(154, 58, 'Roushdy', 'رشدي', 'RSH', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(155, 58, 'Cleopatra', 'كليوباترا', 'CLP', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(156, 58, 'San Stefano', 'سان ستيفانو', 'SST', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(157, 59, 'Dokki', 'الدقي', 'DOK', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(158, 59, 'Mohandessin', 'المهندسين', 'MHN', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(159, 59, '6th of October', 'السادس من أكتوبر', '6OCT', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(160, 59, 'Sheikh Zayed', 'الشيخ زايد', 'SZ', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(161, 59, 'Haram', 'الهرم', 'HRM', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(162, 59, 'Faisal', 'فيصل', 'FSL', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(163, 59, 'Agouza', 'العجوزة', 'AGZ', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(164, 59, 'Imbaba', 'إمبابة', 'IMB', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(165, 59, 'Bulaq al-Dakrour', 'بولاق الدكرور', 'BLD', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(166, 59, 'Kerdasa', 'كرداسة', 'KRD', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(167, 60, 'Benha', 'بنها', 'BNH', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(168, 60, 'Shubra al-Khaimah', 'شبرا الخيمة', 'SHK', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(169, 60, 'Qaha', 'قها', 'QHA', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(170, 60, 'Khanka', 'الخانكة', 'KHN', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(171, 60, 'Shibin al-Qanater', 'شبين القناطر', 'SHQ', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(172, 60, 'Tukh', 'طوخ', 'TKH', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(173, 60, 'Kafr Shukr', 'كفر شكر', 'KFS', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(174, 60, 'Obour City', 'مدينة العبور', 'OBR', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(175, 61, 'Port Said', 'بورسعيد', 'PS', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(176, 61, 'Port Fouad', 'بور فؤاد', 'PF', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(177, 61, 'Al-Zohour', 'الزهور', 'ZHR', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(178, 61, 'Al-Manakh', 'المناخ', 'MNK', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(179, 61, 'Al-Arab', 'العرب', 'ARB', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(180, 62, 'Suez', 'السويس', 'SZ', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(181, 62, 'Ain Sokhna', 'العين السخنة', 'ASK', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(182, 62, 'Ataqah', 'العتقة', 'ATQ', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(183, 62, 'Faisal', 'فيصل', 'FSL', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(184, 62, 'Ganayen', 'الجناين', 'GNN', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(185, 63, 'Luxor', 'الأقصر', 'LXR', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(186, 63, 'Esna', 'إسنا', 'ESN', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(187, 63, 'Armant', 'أرمنت', 'ARM', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(188, 63, 'Al-Tod', 'الطود', 'TOD', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(189, 63, 'Al-Qurna', 'القرنة', 'QRN', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(190, 64, 'Aswan', 'أسوان', 'ASW', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(191, 64, 'Kom Ombo', 'كوم أمبو', 'KOM', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(192, 64, 'Edfu', 'إدفو', 'EDF', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(193, 64, 'Daraw', 'دراو', 'DRW', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(194, 64, 'Abu Simbel', 'أبو سمبل', 'ABS', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(195, 65, 'Asyut', 'أسيوط', 'AST', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(196, 65, 'Dayrut', 'ديروط', 'DYR', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(197, 65, 'Qusiya', 'القوصية', 'QUS', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(198, 65, 'Manfalut', 'منفلوط', 'MNF', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(199, 65, 'Abnoub', 'أبنوب', 'ABN', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(200, 66, 'Damanhour', 'دمنهور', 'DMN', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(201, 66, 'Kafr al-Dawwar', 'كفر الدوار', 'KFD', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(202, 66, 'Rashid', 'رشيد', 'RSH', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(203, 66, 'Idku', 'إدكو', 'IDK', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(204, 66, 'Abu al-Matamir', 'أبو المطامير', 'ABM', 1, '2025-11-07 11:47:07', '2025-11-07 11:47:07'),
(205, 85, 'New Cairo', 'القاهرة الجديدة', 'NC', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(206, 85, 'Maadi', 'المعادي', 'MAD', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(207, 85, 'Heliopolis', 'مصر الجديدة', 'HLP', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(208, 85, 'Downtown', 'وسط البلد', 'DT', 1, '2025-11-07 11:53:22', '2025-11-07 11:53:22'),
(209, 85, 'Zamalek', 'الزمالك', 'ZAM', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(210, 85, 'Nasr City', 'مدينة نصر', 'NSR', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(211, 85, 'Shubra', 'شبرا', 'SHB', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(212, 85, 'Ain Shams', 'عين شمس', 'ASH', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(213, 85, 'Mokattam', 'المقطم', 'MOK', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(214, 85, 'Rehab City', 'مدينة الرحاب', 'RHB', 1, '2025-11-07 11:53:22', '2025-11-07 11:53:22'),
(215, 86, 'Sidi Gaber', 'سيدي جابر', 'SG', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(216, 86, 'Stanley', 'ستانلي', 'STN', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(217, 86, 'Montaza', 'المنتزه', 'MTZ', 1, '2025-11-07 11:53:22', '2025-11-07 11:53:22'),
(218, 86, 'Smouha', 'سموحة', 'SMH', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(219, 86, 'Miami', 'ميامي', 'MIA', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(220, 86, 'Gleem', 'جليم', 'GLM', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(221, 86, 'Sporting', 'سبورتنج', 'SPT', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(222, 86, 'Roushdy', 'رشدي', 'RSH', 1, '2025-11-07 11:53:22', '2025-11-07 11:53:22'),
(223, 86, 'Cleopatra', 'كليوباترا', 'CLP', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(224, 86, 'San Stefano', 'سان ستيفانو', 'SST', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(225, 87, 'Dokki', 'الدقي', 'DOK', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(226, 87, 'Mohandessin', 'المهندسين', 'MHN', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(227, 87, '6th of October', 'السادس من أكتوبر', '6OCT', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(228, 87, 'Sheikh Zayed', 'الشيخ زايد', 'SZ', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(229, 87, 'Haram', 'الهرم', 'HRM', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(230, 87, 'Faisal', 'فيصل', 'FSL', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(231, 87, 'Agouza', 'العجوزة', 'AGZ', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(232, 87, 'Imbaba', 'إمبابة', 'IMB', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(233, 87, 'Bulaq al-Dakrour', 'بولاق الدكرور', 'BLD', 1, '2025-11-07 11:53:22', '2025-11-07 11:53:22'),
(234, 87, 'Kerdasa', 'كرداسة', 'KRD', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(235, 88, 'Benha', 'بنها', 'BNH', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(236, 88, 'Shubra al-Khaimah', 'شبرا الخيمة', 'SHK', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(237, 88, 'Qaha', 'قها', 'QHA', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(238, 88, 'Khanka', 'الخانكة', 'KHN', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(239, 88, 'Shibin al-Qanater', 'شبين القناطر', 'SHQ', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(240, 88, 'Tukh', 'طوخ', 'TKH', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(241, 88, 'Kafr Shukr', 'كفر شكر', 'KFS', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(242, 88, 'Obour City', 'مدينة العبور', 'OBR', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(243, 89, 'Port Said', 'بورسعيد', 'PS', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(244, 89, 'Port Fouad', 'بور فؤاد', 'PF', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(245, 89, 'Al-Zohour', 'الزهور', 'ZHR', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(246, 89, 'Al-Manakh', 'المناخ', 'MNK', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(247, 89, 'Al-Arab', 'العرب', 'ARB', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(248, 90, 'Suez', 'السويس', 'SZ', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(249, 90, 'Ain Sokhna', 'العين السخنة', 'ASK', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(250, 90, 'Ataqah', 'العتقة', 'ATQ', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(251, 90, 'Faisal', 'فيصل', 'FSL', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(252, 90, 'Ganayen', 'الجناين', 'GNN', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(253, 91, 'Luxor', 'الأقصر', 'LXR', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(254, 91, 'Esna', 'إسنا', 'ESN', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(255, 91, 'Armant', 'أرمنت', 'ARM', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(256, 91, 'Al-Tod', 'الطود', 'TOD', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(257, 91, 'Al-Qurna', 'القرنة', 'QRN', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(258, 92, 'Aswan', 'أسوان', 'ASW', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(259, 92, 'Kom Ombo', 'كوم أمبو', 'KOM', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(260, 92, 'Edfu', 'إدفو', 'EDF', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(261, 92, 'Daraw', 'دراو', 'DRW', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(262, 92, 'Abu Simbel', 'أبو سمبل', 'ABS', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(263, 93, 'Asyut', 'أسيوط', 'AST', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(264, 93, 'Dayrut', 'ديروط', 'DYR', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(265, 93, 'Qusiya', 'القوصية', 'QUS', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(266, 93, 'Manfalut', 'منفلوط', 'MNF', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(267, 93, 'Abnoub', 'أبنوب', 'ABN', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(268, 94, 'Damanhour', 'دمنهور', 'DMN', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(269, 94, 'Kafr al-Dawwar', 'كفر الدوار', 'KFD', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(270, 94, 'Rashid', 'رشيد', 'RSH', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(271, 94, 'Idku', 'إدكو', 'IDK', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(272, 94, 'Abu al-Matamir', 'أبو المطامير', 'ABM', 1, '2025-11-07 11:53:22', '2025-11-07 12:29:47'),
(278, 85, 'Shorouk', 'الشروق', 'SHR', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(279, 85, 'Obour', 'العبور', 'OBR', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(280, 85, 'Badr City', 'مدينة بدر', 'BDR', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(284, 85, 'Downtown Cairo', 'وسط البلد', 'DT', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(285, 85, 'Garden City', 'جاردن سيتي', 'GC', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(286, 85, 'Dokki', 'الدقي', 'DOK', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(287, 85, 'Mohandessin', 'المهندسين', 'MHN', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(288, 85, 'Agouza', 'العجوزة', 'AGZ', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(289, 85, 'Imbaba', 'إمبابة', 'IMB', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(290, 85, 'Bulaq', 'بولاق', 'BLQ', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(291, 85, 'Hadayek El Kobba', 'حدائق القبة', 'HKB', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(292, 85, 'Matariya', 'المطرية', 'MTR', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(293, 85, 'Abbasiya', 'العباسية', 'ABS', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(294, 85, 'Helwan', 'حلوان', 'HLW', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(295, 85, 'Masr El Qadima', 'مصر القديمة', 'MEQ', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(296, 85, 'Rod El Farag', 'روض الفرج', 'RDF', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(297, 85, 'Sayeda Zeinab', 'السيدة زينب', 'SZN', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(298, 85, 'Rehab', 'الرحاب', 'RHB', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(299, 85, 'Madinaty', 'مدينتي', 'MDN', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(300, 85, '5th Settlement', 'التجمع الخامس', '5TH', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(301, 85, '1st Settlement', 'التجمع الأول', '1ST', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(302, 85, '3rd Settlement', 'التجمع الثالث', '3RD', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(303, 85, 'Katameya', 'القطامية', 'KTM', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(304, 85, 'New Heliopolis', 'هليوبوليس الجديدة', 'NHL', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(305, 85, 'Sheraton', 'شيراتون', 'SHT', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(306, 85, 'Nozha', 'النزهة', 'NZH', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(307, 85, 'Manial', 'المنيل', 'MNL', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(308, 85, 'Qasr El Nil', 'قصر النيل', 'QSR', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(309, 85, 'Abdeen', 'عابدين', 'ABD', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(310, 85, 'Azbakeya', 'الأزبكية', 'AZB', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(311, 85, 'Bab El Shaariya', 'باب الشعرية', 'BBS', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(312, 85, 'Ramses', 'رمسيس', 'RMS', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(313, 85, 'Waily', 'الوايلي', 'WLY', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(314, 85, 'Zeitoun', 'الزيتون', 'ZTN', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(315, 85, 'Helmeya', 'الحلمية', 'HLM', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(316, 85, 'Darb El Ahmar', 'درب الأحمر', 'DBA', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(317, 85, 'El Salam City', 'مدينة السلام', 'SLM', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(318, 85, '15th May City', 'مدينة 15 مايو', '15M', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(319, 85, 'Fustat', 'الفسطاط', 'FST', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(320, 85, 'Basateen', 'البساتين', 'BST', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(321, 85, 'Dar El Salam', 'دار السلام', 'DSL', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(322, 85, 'Maasara', 'المعصرة', 'MSR', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(323, 85, 'Hadayek El Maadi', 'حدائق المعادي', 'HDM', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(324, 85, 'Sakanat El Maadi', 'ساكنات المعادي', 'SKM', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(325, 85, 'Degla', 'دجلة', 'DGL', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(326, 85, 'Zahraa El Maadi', 'زهراء المعادي', 'ZHM', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(327, 85, 'Arab El Maadi', 'عرب المعادي', 'ARM', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(328, 86, 'Alexandria', 'الإسكندرية', 'ALX', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(329, 86, 'Montazah', 'المنتزه', 'MTZ', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(334, 86, 'Camp Shezar', 'كامب شيزار', 'CMP', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(336, 86, 'Sidi Bishr', 'سيدي بشر', 'SDB', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(337, 86, 'Borg El Arab', 'برج العرب', 'BEA', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(338, 86, 'Agami', 'العجمي', 'AGM', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(339, 86, 'Amreya', 'العامرية', 'AMR', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(340, 86, 'Dekheila', 'الدخيلة', 'DKH', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(341, 86, 'Maamoura', 'المعمورة', 'MAM', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(342, 86, 'Mandara', 'المندرة', 'MND', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(343, 86, 'Asafra', 'العصافرة', 'ASF', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(344, 86, 'Abu Qir', 'أبو قير', 'ABQ', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(346, 86, 'Roshdy', 'رشدي', 'RSH', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(349, 86, 'Shatby', 'شاطبي', 'SHT', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(350, 86, 'Bab Sharq', 'باب شرق', 'BBS', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(351, 86, 'Moharam Bek', 'محرم بك', 'MHB', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(352, 86, 'Karmouz', 'كرموز', 'KRZ', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(353, 86, 'Attarin', 'العطارين', 'ATR', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(354, 86, 'Manshia', 'المنشية', 'MNS', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(355, 86, 'Labban', 'اللبان', 'LBN', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(356, 86, 'Raml Station', 'محطة الرمل', 'RML', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(357, 86, 'Bakos', 'باكوس', 'BKS', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(358, 86, 'Fleming', 'فليمنج', 'FLM', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(359, 86, 'Victoria', 'فيكتوريا', 'VIC', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(360, 86, 'Zezenia', 'زيزينيا', 'ZZN', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(361, 86, 'Kafr Abdo', 'كفر عبده', 'KFA', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(362, 86, 'Louran', 'لوران', 'LRN', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(363, 86, 'Gianaclis', 'جناكليس', 'GNC', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(364, 86, 'Siouf', 'سيوف', 'SIF', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(365, 86, 'Azarita', 'الأزاريطة', 'AZR', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(366, 86, 'Max', 'المكس', 'MAX', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(367, 86, 'Hannoville', 'هانوفيل', 'HNV', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(368, 87, 'Giza', 'الجيزة', 'GIZ', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(377, 87, 'Bulaq Al Dakrour', 'بولاق الدكرور', 'BLD', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(378, 87, 'Kit Kat', 'كيت كات', 'KTK', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(379, 87, 'Warraq', 'الوراق', 'WRQ', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(380, 87, 'Ausim', 'أوسيم', 'AUS', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(382, 87, 'Abu Rawash', 'أبو رواش', 'ABR', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(383, 87, 'Hadayek October', 'حدائق أكتوبر', 'HDO', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(384, 87, 'Smart Village', 'القرية الذكية', 'SMV', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(385, 87, 'Zayed 2000', 'زايد 2000', 'Z2K', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(386, 87, 'Beverly Hills', 'بيفرلي هيلز', 'BVH', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(387, 87, 'Allegria', 'أليجريا', 'ALG', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(388, 87, 'Palm Hills', 'بالم هيلز', 'PLM', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(389, 87, 'Dreamland', 'دريم لاند', 'DRM', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(390, 87, 'Al Wahat', 'الواحات', 'WHT', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(391, 87, 'Al Motamayez', 'المتميز', 'MTM', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(392, 87, 'West Somid', 'غرب سوميد', 'WSM', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(393, 87, 'Bashtil', 'البشتيل', 'BSH', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(394, 87, 'Sakiat Mekki', 'ساقية مكي', 'SKM', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(395, 87, 'Moneeb', 'المنيب', 'MNB', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(396, 87, 'Tahreer', 'التحرير', 'THR', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(397, 87, 'Pyramids Gardens', 'حدائق الأهرام', 'PYG', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(398, 87, 'Saft El Laban', 'صفط اللبن', 'SFL', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(399, 87, 'Dahshour', 'دهشور', 'DHS', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(400, 87, 'Saqqara', 'سقارة', 'SQR', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(401, 87, 'Badrasheen', 'البدرشين', 'BDS', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(402, 87, 'Ayat', 'العياط', 'AYT', 1, '2025-11-07 12:17:32', '2025-11-07 12:29:47'),
(403, 29, 'Abu Dhabi City', 'مدينة أبوظبي', 'AUH', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(404, 29, 'Al Ain', 'العين', 'AAN', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(405, 29, 'Al Dhafra', 'الظفرة', 'DHF', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(406, 29, 'Khalifa City', 'مدينة خليفة', 'KHL', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(407, 29, 'Al Raha', 'الراحة', 'RHA', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(408, 29, 'Yas Island', 'جزيرة ياس', 'YAS', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(409, 29, 'Saadiyat Island', 'جزيرة السعديات', 'SAD', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(410, 29, 'Al Shamkha', 'الشامخة', 'SHM', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(411, 29, 'Baniyas', 'بني ياس', 'BNY', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(412, 29, 'Musaffah', 'مصفح', 'MSF', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(413, 30, 'Dubai City', 'مدينة دبي', 'DXB', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(414, 30, 'Deira', 'ديرة', 'DEI', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(415, 30, 'Bur Dubai', 'بر دبي', 'BUR', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(416, 30, 'Downtown Dubai', 'وسط مدينة دبي', 'DTD', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(417, 30, 'Dubai Marina', 'دبي مارينا', 'MAR', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(418, 30, 'Jumeirah', 'جميرا', 'JUM', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(419, 30, 'Palm Jumeirah', 'نخلة جميرا', 'PLM', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(420, 30, 'Business Bay', 'الخليج التجاري', 'BBY', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(421, 30, 'Dubai Silicon Oasis', 'واحة دبي للسيليكون', 'DSO', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(422, 30, 'Dubai Sports City', 'مدينة دبي الرياضية', 'DSC', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(424, 30, 'Arabian Ranches', 'المرابع العربية', 'ARA', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(425, 30, 'Dubai Hills Estate', 'دبي هيلز استيت', 'DHE', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(426, 30, 'City Walk', 'سيتي ووك', 'CWK', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(427, 30, 'Al Barsha', 'البرشاء', 'BRS', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(428, 31, 'Sharjah City', 'مدينة الشارقة', 'SHJ', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(429, 31, 'Al Majaz', 'المجاز', 'MJZ', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(430, 31, 'Al Nahda', 'النهدة', 'NHD', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(431, 31, 'Al Qasimia', 'القاسمية', 'QSM', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(432, 31, 'Al Taawun', 'التعاون', 'TAW', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(433, 31, 'Muweilah', 'مويلح', 'MWL', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(434, 31, 'Al Khan', 'الخان', 'KHN', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(435, 31, 'Kalba', 'كلباء', 'KLB', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(436, 31, 'Khorfakkan', 'خورفكان', 'KHF', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(437, 31, 'Dibba Al-Hisn', 'دبا الحصن', 'DBH', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(438, 32, 'Ajman City', 'مدينة عجمان', 'AJM', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(439, 32, 'Al Nuaimiya', 'النعيمية', 'NUM', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(440, 32, 'Al Rashidiya', 'الراشدية', 'RSH', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(441, 32, 'Al Jurf', 'الجرف', 'JRF', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(442, 32, 'Al Hamidiya', 'الحميدية', 'HMD', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(444, 33, 'Umm Al Quwain City', 'مدينة أم القيوين', 'UAQ', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(445, 33, 'Falaj Al Mualla', 'فلج المعلا', 'FLJ', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(446, 33, 'Al Raas', 'الراس', 'RAS', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(447, 33, 'Al Salamah', 'السلامة', 'SLM', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(448, 34, 'Ras Al Khaimah City', 'مدينة رأس الخيمة', 'RAK', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(449, 34, 'Al Nakheel', 'النخيل', 'NKH', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(450, 34, 'Al Qusaidat', 'القصيدات', 'QSD', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(451, 34, 'Dafan Al Nakheel', 'دفن النخيل', 'DFN', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(452, 34, 'Digdaga', 'دقداقة', 'DGD', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(453, 34, 'Al Jazirah Al Hamra', 'الجزيرة الحمراء', 'JZH', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(454, 35, 'Fujairah City', 'مدينة الفجيرة', 'FUJ', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(455, 35, 'Dibba Al-Fujairah', 'دبا الفجيرة', 'DBF', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(456, 35, 'Al Bidya', 'البدية', 'BDY', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(457, 35, 'Qidfa', 'قدفع', 'QDF', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(458, 35, 'Masafi', 'مسافي', 'MSF', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(459, 35, 'Mirbah', 'مربح', 'MRB', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32');

-- --------------------------------------------------------

--
-- Table structure for table `contact_requests`
--

CREATE TABLE `contact_requests` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `status` enum('pending','in_progress','resolved','closed') NOT NULL DEFAULT 'pending',
  `assigned_to` bigint(20) UNSIGNED DEFAULT NULL,
  `admin_notes` text DEFAULT NULL,
  `resolved_at` timestamp NULL DEFAULT NULL,
  `email_sent` tinyint(1) NOT NULL DEFAULT 0,
  `email_sent_at` timestamp NULL DEFAULT NULL,
  `email_response` text DEFAULT NULL,
  `priority` enum('low','medium','high','urgent') NOT NULL DEFAULT 'medium',
  `category` enum('general','property_inquiry','technical_support','complaint','suggestion') NOT NULL DEFAULT 'general',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `name_ar` varchar(255) NOT NULL,
  `code` varchar(3) NOT NULL,
  `phone_code` varchar(10) NOT NULL,
  `currency_code` varchar(3) DEFAULT NULL,
  `currency_symbol` varchar(10) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name_en`, `name_ar`, `code`, `phone_code`, `currency_code`, `currency_symbol`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Egypt', 'مصر', 'EG', '+20', 'EGP', 'ج.م', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(2, 'Saudi Arabia', 'السعودية', 'SA', '+966', 'SAR', 'ر.س', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(3, 'United Arab Emirates', 'الإمارات', 'AE', '+971', 'AED', 'د.إ', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(4, 'Kuwait', 'الكويت', 'KW', '+965', 'KWD', 'د.ك', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(5, 'Qatar', 'قطر', 'QA', '+974', 'QAR', 'ر.ق', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(6, 'Bahrain', 'البحرين', 'BH', '+973', 'BHD', 'د.ب', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(7, 'Oman', 'عمان', 'OM', '+968', 'OMR', 'ر.ع', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(8, 'Jordan', 'الأردن', 'JO', '+962', 'JOD', 'د.ا', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(9, 'Lebanon', 'لبنان', 'LB', '+961', 'LBP', 'ل.ل', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(10, 'Iraq', 'العراق', 'IQ', '+964', 'IQD', 'د.ع', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(11, 'Palestine', 'فلسطين', 'PS', '+970', 'ILS', '₪', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(12, 'Syria', 'سوريا', 'SY', '+963', 'SYP', 'ل.س', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(13, 'Yemen', 'اليمن', 'YE', '+967', 'YER', 'ر.ي', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(14, 'Libya', 'ليبيا', 'LY', '+218', 'LYD', 'ل.د', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(15, 'Tunisia', 'تونس', 'TN', '+216', 'TND', 'د.ت', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(16, 'Algeria', 'الجزائر', 'DZ', '+213', 'DZD', 'د.ج', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(17, 'Morocco', 'المغرب', 'MA', '+212', 'MAD', 'د.م', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(18, 'Sudan', 'السودان', 'SD', '+249', 'SDG', 'ج.س', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(19, 'United States', 'الولايات المتحدة', 'US', '+1', 'USD', '$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(20, 'United Kingdom', 'بريطانيا', 'GB', '+44', 'GBP', '£', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(21, 'Canada', 'كندا', 'CA', '+1', 'CAD', 'C$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(22, 'Australia', 'أستراليا', 'AU', '+61', 'AUD', 'A$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(23, 'Germany', 'ألمانيا', 'DE', '+49', 'EUR', '€', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(24, 'France', 'فرنسا', 'FR', '+33', 'EUR', '€', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(25, 'Italy', 'إيطاليا', 'IT', '+39', 'EUR', '€', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(26, 'Spain', 'إسبانيا', 'ES', '+34', 'EUR', '€', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(27, 'Turkey', 'تركيا', 'TR', '+90', 'TRY', '₺', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(28, 'Netherlands', 'هولندا', 'NL', '+31', 'EUR', '€', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(29, 'Belgium', 'بلجيكا', 'BE', '+32', 'EUR', '€', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(30, 'Switzerland', 'سويسرا', 'CH', '+41', 'CHF', 'Fr', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(31, 'Austria', 'النمسا', 'AT', '+43', 'EUR', '€', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(32, 'Sweden', 'السويد', 'SE', '+46', 'SEK', 'kr', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(33, 'Norway', 'النرويج', 'NO', '+47', 'NOK', 'kr', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(34, 'Denmark', 'الدنمارك', 'DK', '+45', 'DKK', 'kr', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(35, 'Finland', 'فنلندا', 'FI', '+358', 'EUR', '€', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(36, 'Poland', 'بولندا', 'PL', '+48', 'PLN', 'zł', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(37, 'Portugal', 'البرتغال', 'PT', '+351', 'EUR', '€', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(38, 'Greece', 'اليونان', 'GR', '+30', 'EUR', '€', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(39, 'Czech Republic', 'التشيك', 'CZ', '+420', 'CZK', 'Kč', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(40, 'Hungary', 'المجر', 'HU', '+36', 'HUF', 'Ft', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(41, 'Romania', 'رومانيا', 'RO', '+40', 'RON', 'lei', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(42, 'Bulgaria', 'بلغاريا', 'BG', '+359', 'BGN', 'лв', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(43, 'Russia', 'روسيا', 'RU', '+7', 'RUB', '₽', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(44, 'Ukraine', 'أوكرانيا', 'UA', '+380', 'UAH', '₴', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(45, 'Ireland', 'أيرلندا', 'IE', '+353', 'EUR', '€', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(46, 'Iceland', 'آيسلندا', 'IS', '+354', 'ISK', 'kr', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(47, 'Croatia', 'كرواتيا', 'HR', '+385', 'EUR', '€', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(48, 'Serbia', 'صربيا', 'RS', '+381', 'RSD', 'дин', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(49, 'Slovakia', 'سلوفاكيا', 'SK', '+421', 'EUR', '€', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(50, 'Slovenia', 'سلوفينيا', 'SI', '+386', 'EUR', '€', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(51, 'Lithuania', 'ليتوانيا', 'LT', '+370', 'EUR', '€', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(52, 'Latvia', 'لاتفيا', 'LV', '+371', 'EUR', '€', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(53, 'Estonia', 'إستونيا', 'EE', '+372', 'EUR', '€', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(54, 'Luxembourg', 'لوكسمبورغ', 'LU', '+352', 'EUR', '€', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(55, 'Malta', 'مالطا', 'MT', '+356', 'EUR', '€', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(56, 'Cyprus', 'قبرص', 'CY', '+357', 'EUR', '€', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(57, 'Albania', 'ألبانيا', 'AL', '+355', 'ALL', 'L', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(58, 'Bosnia and Herzegovina', 'البوسنة والهرسك', 'BA', '+387', 'BAM', 'KM', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(59, 'North Macedonia', 'مقدونيا الشمالية', 'MK', '+389', 'MKD', 'ден', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(60, 'Montenegro', 'الجبل الأسود', 'ME', '+382', 'EUR', '€', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(61, 'Moldova', 'مولدوفا', 'MD', '+373', 'MDL', 'L', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(62, 'Belarus', 'بيلاروسيا', 'BY', '+375', 'BYN', 'Br', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(63, 'Monaco', 'موناكو', 'MC', '+377', 'EUR', '€', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(64, 'Liechtenstein', 'ليختنشتاين', 'LI', '+423', 'CHF', 'Fr', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(65, 'Mexico', 'المكسيك', 'MX', '+52', 'MXN', '$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(66, 'Brazil', 'البرازيل', 'BR', '+55', 'BRL', 'R$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(67, 'Argentina', 'الأرجنتين', 'AR', '+54', 'ARS', '$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(68, 'Chile', 'تشيلي', 'CL', '+56', 'CLP', '$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(69, 'Colombia', 'كولومبيا', 'CO', '+57', 'COP', '$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(70, 'Peru', 'بيرو', 'PE', '+51', 'PEN', 'S/', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(71, 'Venezuela', 'فنزويلا', 'VE', '+58', 'VES', 'Bs', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(72, 'Ecuador', 'الإكوادور', 'EC', '+593', 'USD', '$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(73, 'Bolivia', 'بوليفيا', 'BO', '+591', 'BOB', 'Bs', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(74, 'Paraguay', 'باراغواي', 'PY', '+595', 'PYG', '₲', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(75, 'Uruguay', 'أوروغواي', 'UY', '+598', 'UYU', '$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(76, 'Guyana', 'غويانا', 'GY', '+592', 'GYD', '$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(77, 'Suriname', 'سورينام', 'SR', '+597', 'SRD', '$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(78, 'Costa Rica', 'كوستاريكا', 'CR', '+506', 'CRC', '₡', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(79, 'Panama', 'بنما', 'PA', '+507', 'PAB', 'B/.', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(80, 'Guatemala', 'غواتيمالا', 'GT', '+502', 'GTQ', 'Q', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(81, 'Honduras', 'هندوراس', 'HN', '+504', 'HNL', 'L', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(82, 'Nicaragua', 'نيكاراغوا', 'NI', '+505', 'NIO', 'C$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(83, 'El Salvador', 'السلفادور', 'SV', '+503', 'USD', '$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(84, 'Belize', 'بليز', 'BZ', '+501', 'BZD', 'BZ$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(85, 'Cuba', 'كوبا', 'CU', '+53', 'CUP', '$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(86, 'Jamaica', 'جامايكا', 'JM', '+1876', 'JMD', 'J$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(87, 'Haiti', 'هايتي', 'HT', '+509', 'HTG', 'G', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(88, 'Dominican Republic', 'جمهورية الدومينيكان', 'DO', '+1809', 'DOP', 'RD$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(89, 'Trinidad and Tobago', 'ترينيداد وتوباغو', 'TT', '+1868', 'TTD', 'TT$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(90, 'Bahamas', 'جزر البهاما', 'BS', '+1242', 'BSD', 'B$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(91, 'Barbados', 'بربادوس', 'BB', '+1246', 'BBD', 'Bds$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(92, 'Grenada', 'غرينادا', 'GD', '+1473', 'XCD', '$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(93, 'Saint Lucia', 'سانت لوسيا', 'LC', '+1758', 'XCD', '$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(94, 'Saint Vincent', 'سانت فنسنت', 'VC', '+1784', 'XCD', '$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(95, 'Antigua and Barbuda', 'أنتيغوا وباربودا', 'AG', '+1268', 'XCD', '$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(96, 'Saint Kitts and Nevis', 'سانت كيتس ونيفيس', 'KN', '+1869', 'XCD', '$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(97, 'Dominica', 'دومينيكا', 'DM', '+1767', 'XCD', '$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(98, 'China', 'الصين', 'CN', '+86', 'CNY', '¥', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(99, 'Japan', 'اليابان', 'JP', '+81', 'JPY', '¥', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(100, 'India', 'الهند', 'IN', '+91', 'INR', '₹', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(101, 'South Korea', 'كوريا الجنوبية', 'KR', '+82', 'KRW', '₩', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(102, 'Pakistan', 'باكستان', 'PK', '+92', 'PKR', '₨', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(103, 'Bangladesh', 'بنغلاديش', 'BD', '+880', 'BDT', '৳', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(104, 'Indonesia', 'إندونيسيا', 'ID', '+62', 'IDR', 'Rp', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(105, 'Philippines', 'الفلبين', 'PH', '+63', 'PHP', '₱', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(106, 'Vietnam', 'فيتنام', 'VN', '+84', 'VND', '₫', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(107, 'Thailand', 'تايلاند', 'TH', '+66', 'THB', '฿', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(108, 'Malaysia', 'ماليزيا', 'MY', '+60', 'MYR', 'RM', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(109, 'Singapore', 'سنغافورة', 'SG', '+65', 'SGD', 'S$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(110, 'Myanmar', 'ميانمار', 'MM', '+95', 'MMK', 'K', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(111, 'Cambodia', 'كمبوديا', 'KH', '+855', 'KHR', '៛', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(112, 'Laos', 'لاوس', 'LA', '+856', 'LAK', '₭', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(113, 'Brunei', 'بروناي', 'BN', '+673', 'BND', 'B$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(114, 'Sri Lanka', 'سريلانكا', 'LK', '+94', 'LKR', 'Rs', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(115, 'Nepal', 'نيبال', 'NP', '+977', 'NPR', 'Rs', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(116, 'Maldives', 'المالديف', 'MV', '+960', 'MVR', 'Rf', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(117, 'Afghanistan', 'أفغانستان', 'AF', '+93', 'AFN', '؋', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(118, 'Kazakhstan', 'كازاخستان', 'KZ', '+7', 'KZT', '₸', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(119, 'Uzbekistan', 'أوزبكستان', 'UZ', '+998', 'UZS', 'som', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(120, 'Turkmenistan', 'تركمانستان', 'TM', '+993', 'TMT', 'm', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(121, 'Tajikistan', 'طاجيكستان', 'TJ', '+992', 'TJS', 'ЅМ', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(122, 'Kyrgyzstan', 'قيرغيزستان', 'KG', '+996', 'KGS', 'с', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(123, 'Mongolia', 'منغوليا', 'MN', '+976', 'MNT', '₮', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(124, 'North Korea', 'كوريا الشمالية', 'KP', '+850', 'KPW', '₩', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(125, 'Taiwan', 'تايوان', 'TW', '+886', 'TWD', 'NT$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(126, 'Hong Kong', 'هونغ كونغ', 'HK', '+852', 'HKD', 'HK$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(127, 'Macau', 'ماكاو', 'MO', '+853', 'MOP', 'P', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(128, 'New Zealand', 'نيوزيلندا', 'NZ', '+64', 'NZD', 'NZ$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(129, 'Papua New Guinea', 'بابوا غينيا الجديدة', 'PG', '+675', 'PGK', 'K', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(130, 'Fiji', 'فيجي', 'FJ', '+679', 'FJD', 'FJ$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(131, 'Solomon Islands', 'جزر سليمان', 'SB', '+677', 'SBD', 'SI$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(132, 'Vanuatu', 'فانواتو', 'VU', '+678', 'VUV', 'VT', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(133, 'Samoa', 'ساموا', 'WS', '+685', 'WST', 'WS$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(134, 'Tonga', 'تونغا', 'TO', '+676', 'TOP', 'T$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(135, 'Kiribati', 'كيريباتي', 'KI', '+686', 'AUD', 'A$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(136, 'Micronesia', 'ميكرونيزيا', 'FM', '+691', 'USD', '$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(137, 'Marshall Islands', 'جزر مارشال', 'MH', '+692', 'USD', '$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(138, 'Palau', 'بالاو', 'PW', '+680', 'USD', '$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(139, 'Nauru', 'ناورو', 'NR', '+674', 'AUD', 'A$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(140, 'Tuvalu', 'توفالو', 'TV', '+688', 'AUD', 'A$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(141, 'Timor-Leste', 'تيمور الشرقية', 'TL', '+670', 'USD', '$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(142, 'Bhutan', 'بوتان', 'BT', '+975', 'BTN', 'Nu', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(143, 'Iran', 'إيران', 'IR', '+98', 'IRR', '﷼', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(144, 'Azerbaijan', 'أذربيجان', 'AZ', '+994', 'AZN', '₼', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(145, 'South Africa', 'جنوب إفريقيا', 'ZA', '+27', 'ZAR', 'R', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(146, 'Nigeria', 'نيجيريا', 'NG', '+234', 'NGN', '₦', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(147, 'Kenya', 'كينيا', 'KE', '+254', 'KES', 'KSh', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(148, 'Ethiopia', 'إثيوبيا', 'ET', '+251', 'ETB', 'Br', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(149, 'Tanzania', 'تنزانيا', 'TZ', '+255', 'TZS', 'TSh', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(150, 'Uganda', 'أوغندا', 'UG', '+256', 'UGX', 'USh', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(151, 'Ghana', 'غانا', 'GH', '+233', 'GHS', 'GH₵', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(152, 'Senegal', 'السنغال', 'SN', '+221', 'XOF', 'CFA', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(153, 'Ivory Coast', 'ساحل العاج', 'CI', '+225', 'XOF', 'CFA', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(154, 'Cameroon', 'الكاميرون', 'CM', '+237', 'XAF', 'FCFA', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(155, 'Zimbabwe', 'زيمبابوي', 'ZW', '+263', 'ZWL', 'Z$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(156, 'Zambia', 'زامبيا', 'ZM', '+260', 'ZMW', 'ZK', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(157, 'Mozambique', 'موزمبيق', 'MZ', '+258', 'MZN', 'MT', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(158, 'Botswana', 'بوتسوانا', 'BW', '+267', 'BWP', 'P', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(159, 'Namibia', 'ناميبيا', 'NA', '+264', 'NAD', 'N$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(160, 'Angola', 'أنغولا', 'AO', '+244', 'AOA', 'Kz', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(161, 'Rwanda', 'رواندا', 'RW', '+250', 'RWF', 'FRw', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(162, 'Burundi', 'بوروندي', 'BI', '+257', 'BIF', 'FBu', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(163, 'Somalia', 'الصومال', 'SO', '+252', 'SOS', 'S', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(164, 'Djibouti', 'جيبوتي', 'DJ', '+253', 'DJF', 'Fdj', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(165, 'Eritrea', 'إريتريا', 'ER', '+291', 'ERN', 'Nfk', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(166, 'Mauritius', 'موريشيوس', 'MU', '+230', 'MUR', '₨', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(167, 'Seychelles', 'سيشل', 'SC', '+248', 'SCR', '₨', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(168, 'Madagascar', 'مدغشقر', 'MG', '+261', 'MGA', 'Ar', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(169, 'Comoros', 'جزر القمر', 'KM', '+269', 'KMF', 'CF', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(170, 'Malawi', 'ملاوي', 'MW', '+265', 'MWK', 'MK', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(171, 'Lesotho', 'ليسوتو', 'LS', '+266', 'LSL', 'L', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(172, 'Eswatini', 'إسواتيني', 'SZ', '+268', 'SZL', 'E', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(173, 'Mali', 'مالي', 'ML', '+223', 'XOF', 'CFA', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(174, 'Burkina Faso', 'بوركينا فاسو', 'BF', '+226', 'XOF', 'CFA', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(175, 'Niger', 'النيجر', 'NE', '+227', 'XOF', 'CFA', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(176, 'Chad', 'تشاد', 'TD', '+235', 'XAF', 'FCFA', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(177, 'Mauritania', 'موريتانيا', 'MR', '+222', 'MRU', 'UM', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(178, 'Benin', 'بنين', 'BJ', '+229', 'XOF', 'CFA', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(179, 'Togo', 'توغو', 'TG', '+228', 'XOF', 'CFA', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(180, 'Guinea', 'غينيا', 'GN', '+224', 'GNF', 'FG', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(181, 'Sierra Leone', 'سيراليون', 'SL', '+232', 'SLL', 'Le', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(182, 'Liberia', 'ليبيريا', 'LR', '+231', 'LRD', 'L$', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(183, 'Gambia', 'غامبيا', 'GM', '+220', 'GMD', 'D', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(184, 'Guinea-Bissau', 'غينيا بيساو', 'GW', '+245', 'XOF', 'CFA', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(185, 'Equatorial Guinea', 'غينيا الاستوائية', 'GQ', '+240', 'XAF', 'FCFA', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(186, 'Gabon', 'الغابون', 'GA', '+241', 'XAF', 'FCFA', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(187, 'Congo', 'الكونغو', 'CG', '+242', 'XAF', 'FCFA', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(188, 'DR Congo', 'الكونغو الديمقراطية', 'CD', '+243', 'CDF', 'FC', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(189, 'Central African Republic', 'جمهورية أفريقيا الوسطى', 'CF', '+236', 'XAF', 'FCFA', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(190, 'South Sudan', 'جنوب السودان', 'SS', '+211', 'SSP', '£', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(191, 'Cape Verde', 'الرأس الأخضر', 'CV', '+238', 'CVE', 'Esc', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10'),
(192, 'Sao Tome and Principe', 'ساو تومي وبرينسيبي', 'ST', '+239', 'STN', 'Db', 1, '2025-11-07 12:30:10', '2025-11-07 12:30:10');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `property_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `governorates`
--

CREATE TABLE `governorates` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `country_id` bigint(20) UNSIGNED NOT NULL,
  `name_en` varchar(255) NOT NULL,
  `name_ar` varchar(255) NOT NULL,
  `code` varchar(10) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `governorates`
--

INSERT INTO `governorates` (`id`, `country_id`, `name_en`, `name_ar`, `code`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 'Cairo', 'القاهرة', 'CAI', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(2, 1, 'Alexandria', 'الإسكندرية', 'ALX', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(3, 1, 'Giza', 'الجيزة', 'GIZ', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(4, 1, 'Qalyubia', 'القليوبية', 'QLY', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(5, 1, 'Port Said', 'بورسعيد', 'PTS', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(6, 1, 'Suez', 'السويس', 'SUZ', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(7, 1, 'Luxor', 'الأقصر', 'LXR', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(8, 1, 'Aswan', 'أسوان', 'ASN', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(9, 1, 'Asyut', 'أسيوط', 'AST', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(10, 1, 'Beheira', 'البحيرة', 'BHR', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(11, 1, 'Beni Suef', 'بني سويف', 'BNS', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(12, 1, 'Dakahlia', 'الدقهلية', 'DKH', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(13, 1, 'Damietta', 'دمياط', 'DMT', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(14, 1, 'Fayyum', 'الفيوم', 'FYM', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(15, 1, 'Gharbia', 'الغربية', 'GHR', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(16, 1, 'Ismailia', 'الإسماعيلية', 'ISM', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(17, 1, 'Kafr el-Sheikh', 'كفر الشيخ', 'KFS', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(18, 1, 'Matrouh', 'مطروح', 'MTR', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(19, 1, 'Minya', 'المنيا', 'MNY', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(20, 1, 'Monufia', 'المنوفية', 'MNF', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(21, 1, 'New Valley', 'الوادي الجديد', 'WAD', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(22, 1, 'North Sinai', 'شمال سيناء', 'SIN', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(23, 1, 'Qena', 'قنا', 'QNA', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(24, 1, 'Red Sea', 'البحر الأحمر', 'SEA', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(25, 1, 'Sharqia', 'الشرقية', 'SHR', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(26, 1, 'Sohag', 'سوهاج', 'SOH', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(27, 1, 'South Sinai', 'جنوب سيناء', 'SIS', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(28, 1, 'Tanta', 'طنطا', 'TNT', 1, '2025-11-07 11:39:28', '2025-11-07 11:53:06'),
(29, 3, 'Abu Dhabi', 'أبوظبي', 'AZ', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(30, 3, 'Dubai', 'دبي', 'DU', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(31, 3, 'Sharjah', 'الشارقة', 'SH', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(32, 3, 'Ajman', 'عجمان', 'AJ', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(33, 3, 'Umm Al Quwain', 'أم القيوين', 'UQ', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(34, 3, 'Ras Al Khaimah', 'رأس الخيمة', 'RK', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32'),
(35, 3, 'Fujairah', 'الفجيرة', 'FU', 1, '2025-11-07 15:15:32', '2025-11-07 15:15:32');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menu_items`
--

CREATE TABLE `menu_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `category` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2025_01_21_000003_create_users_table', 1),
(2, '2025_01_21_000002_create_cities_table', 2),
(3, '2025_11_07_000001_create_countries_table', 3),
(4, '2025_01_21_000004_create_properties_table', 4),
(5, '2025_11_07_000002_add_multi_category_support_to_properties', 5),
(7, '2025_01_21_000001_create_governorates_table', 7),
(8, '2024_01_26_000001_add_email_verified_at_to_users_table', 8),
(9, '2024_01_26_000002_create_cache_table', 8),
(10, '2024_01_26_000003_update_users_table_for_verification', 8),
(11, '2025_01_21_000005_create_chats_table', 8),
(12, '2025_01_21_000006_create_contact_requests_table', 8),
(13, '2025_01_22_000001_add_is_founder_to_users_table', 7),
(14, '2025_08_16_093334_create_personal_access_tokens_table', 9),
(15, '2025_08_16_133423_create_menu_items_table', 9),
(16, '2025_08_16_133424_create_bookings_table', 9),
(17, '2025_08_16_133503_create_notifications_table', 9),
(18, '2025_08_16_140129_create_sessions_table', 9),
(19, '2025_08_16_144056_add_image_url_to_menu_items_table', 9),
(20, '2025_09_05_064113_create_cache_table', 7),
(21, '2025_09_05_092754_add_deleted_at_to_properties_table', 10),
(22, '2025_10_21_185306_add_is_active_to_properties_table', 10),
(23, '2025_10_21_191048_add_needs_reapproval_to_properties_table', 10),
(24, '2025_10_22_092020_create_password_reset_tokens_table', 10),
(25, '2025_10_22_205854_add_online_status_to_users_table', 10),
(26, '2025_10_22_213700_add_performance_indexes', 10),
(27, '2025_10_23_151253_create_favorites_table', 10),
(28, '2025_10_23_232754_create_jobs_table', 10),
(29, '2025_10_24_091205_add_email_verification_to_users_table', 10),
(30, '2025_10_25_181412_add_viewers_to_properties_table', 10),
(31, '2025_10_26_205126_create_property_comments_tables', 10),
(32, '2025_11_07_000004_migrate_existing_properties_data', 10),
(33, '2025_11_08_074358_add_job_location_type_to_properties_table', 11);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `message` text NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'general',
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` timestamp NOT NULL,
  `used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(2, 'App\\Models\\User', 1, 'auth_token', '3e9dfae3f306630333bbbb027b1609492b8d4f923b68558101d627e2d63a0810', '[\"*\"]', '2025-11-07 16:52:12', NULL, '2025-11-07 12:08:36', '2025-11-07 16:52:12'),
(5, 'App\\Models\\User', 1, 'auth_token', 'ea80ee0e9425aff6804850fe6f47a26ba1dc1e76cf273da98178f3ed0b698172', '[\"*\"]', '2025-11-07 22:09:20', NULL, '2025-11-07 20:14:38', '2025-11-07 22:09:20'),
(6, 'App\\Models\\User', 3, 'auth_token', 'd0b97530371bf9bda2cbc4fcb6909e33c1ccd59db8b42c8493d415e38ac12f7f', '[\"*\"]', '2025-11-07 21:55:49', NULL, '2025-11-07 20:16:13', '2025-11-07 21:55:49'),
(7, 'App\\Models\\User', 2, 'auth_token', 'e4d92f6315d4f4b12aa85cba218fdd7835cc98b52332a93d47cb343e1ca7da21', '[\"*\"]', '2025-11-08 10:24:39', NULL, '2025-11-07 20:17:43', '2025-11-08 10:24:39'),
(10, 'App\\Models\\User', 3, 'auth_token', 'f5305dcdb9b00d8de0bafb740f691a07f0078bca61c451fd46be956af016a918', '[\"*\"]', '2025-11-08 10:05:31', NULL, '2025-11-08 06:39:24', '2025-11-08 10:05:31'),
(12, 'App\\Models\\User', 3, 'auth_token', 'c40c2911bbf493ec9896152c3423106b7e140d1ba4b65b0678d6d9688b912cdb', '[\"*\"]', '2025-11-08 10:06:53', NULL, '2025-11-08 10:05:48', '2025-11-08 10:06:53'),
(13, 'App\\Models\\User', 1, 'auth_token', 'c280503c5e69eb306b7048961b7b8486f5080a392ba2ffedaa306eee5e630e9c', '[\"*\"]', '2025-11-08 10:08:30', NULL, '2025-11-08 10:07:46', '2025-11-08 10:08:30');

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `country_id` bigint(20) UNSIGNED DEFAULT NULL,
  `governorate_id` bigint(20) UNSIGNED NOT NULL,
  `city_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `rent_or_buy` varchar(255) DEFAULT NULL,
  `listing_type` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `car_make` varchar(255) DEFAULT NULL,
  `car_model` varchar(255) DEFAULT NULL,
  `car_year` int(11) DEFAULT NULL,
  `car_condition` varchar(255) DEFAULT NULL,
  `car_mileage` int(11) DEFAULT NULL,
  `car_transmission` varchar(255) DEFAULT NULL,
  `car_fuel_type` varchar(255) DEFAULT NULL,
  `electronics_type` varchar(255) DEFAULT NULL,
  `electronics_brand` varchar(255) DEFAULT NULL,
  `electronics_condition` varchar(255) DEFAULT NULL,
  `electronics_warranty` varchar(255) DEFAULT NULL,
  `mobile_brand` varchar(255) DEFAULT NULL,
  `mobile_model` varchar(255) DEFAULT NULL,
  `mobile_storage` varchar(255) DEFAULT NULL,
  `mobile_color` varchar(255) DEFAULT NULL,
  `mobile_condition` varchar(255) DEFAULT NULL,
  `job_type` varchar(255) DEFAULT NULL,
  `job_experience_level` varchar(255) DEFAULT NULL,
  `job_employment_type` varchar(255) DEFAULT NULL,
  `job_location_type` varchar(255) DEFAULT NULL,
  `job_salary_min` decimal(15,2) DEFAULT NULL,
  `job_salary_max` decimal(15,2) DEFAULT NULL,
  `vehicle_type` varchar(255) DEFAULT NULL,
  `vehicle_with_driver` tinyint(1) NOT NULL DEFAULT 0,
  `vehicle_rental_duration` varchar(255) DEFAULT NULL,
  `booking_type` varchar(255) DEFAULT NULL,
  `doctor_specialty` varchar(255) DEFAULT NULL,
  `doctor_name` varchar(255) DEFAULT NULL,
  `clinic_hospital_name` varchar(255) DEFAULT NULL,
  `available_days` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`available_days`)),
  `available_hours` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`available_hours`)),
  `bedrooms` int(11) DEFAULT NULL,
  `bathrooms` int(11) DEFAULT NULL,
  `area` decimal(10,2) DEFAULT NULL,
  `floor_number` int(11) DEFAULT NULL,
  `total_floors` int(11) DEFAULT NULL,
  `built_year` year(4) DEFAULT NULL,
  `furnished` tinyint(1) NOT NULL DEFAULT 0,
  `has_parking` tinyint(1) NOT NULL DEFAULT 0,
  `has_garden` tinyint(1) NOT NULL DEFAULT 0,
  `has_pool` tinyint(1) NOT NULL DEFAULT 0,
  `has_elevator` tinyint(1) NOT NULL DEFAULT 0,
  `address` varchar(255) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `status` enum('pending','approved','rejected','sold','rented') NOT NULL DEFAULT 'pending',
  `average_rating` decimal(3,2) NOT NULL DEFAULT 0.00,
  `total_comments` int(11) NOT NULL DEFAULT 0,
  `approved_by` bigint(20) UNSIGNED DEFAULT NULL,
  `approved_at` timestamp NULL DEFAULT NULL,
  `rejection_reason` text DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `video_url` varchar(255) DEFAULT NULL,
  `documents` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`documents`)),
  `slug` varchar(255) DEFAULT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features`)),
  `views_count` int(11) NOT NULL DEFAULT 0,
  `inquiries_count` int(11) NOT NULL DEFAULT 0,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `needs_reapproval` tinyint(1) NOT NULL DEFAULT 0,
  `featured_until` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `sold_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `user_id`, `country_id`, `governorate_id`, `city_id`, `title`, `description`, `price`, `rent_or_buy`, `listing_type`, `category`, `car_make`, `car_model`, `car_year`, `car_condition`, `car_mileage`, `car_transmission`, `car_fuel_type`, `electronics_type`, `electronics_brand`, `electronics_condition`, `electronics_warranty`, `mobile_brand`, `mobile_model`, `mobile_storage`, `mobile_color`, `mobile_condition`, `job_type`, `job_experience_level`, `job_employment_type`, `job_location_type`, `job_salary_min`, `job_salary_max`, `vehicle_type`, `vehicle_with_driver`, `vehicle_rental_duration`, `booking_type`, `doctor_specialty`, `doctor_name`, `clinic_hospital_name`, `available_days`, `available_hours`, `bedrooms`, `bathrooms`, `area`, `floor_number`, `total_floors`, `built_year`, `furnished`, `has_parking`, `has_garden`, `has_pool`, `has_elevator`, `address`, `latitude`, `longitude`, `status`, `average_rating`, `total_comments`, `approved_by`, `approved_at`, `rejection_reason`, `images`, `video_url`, `documents`, `slug`, `features`, `views_count`, `inquiries_count`, `is_featured`, `is_active`, `needs_reapproval`, `featured_until`, `created_at`, `updated_at`, `deleted_at`, `sold_at`) VALUES
(1, 3, 1, 1, 5, 'toyota', 'sdggggggggggggggggggggggggggggggggggggggggggggg', 120000.00, 'buy', 'car', 'other', 'Acura', 'ILX', 2025, 'new', 50000, 'automatic', 'petrol', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, 1, '2025-11-07 20:40:06', NULL, '[\"\\/storage\\/properties\\/Cm2XQKI1UFA8UJRNy9M2iFliF0j99rYYbgRQvgsc.jpg\"]', NULL, NULL, 'toyota-GxZTRC', NULL, 0, 0, 0, 1, 0, NULL, '2025-11-07 20:39:26', '2025-11-07 20:51:59', '2025-11-07 20:51:59', NULL),
(2, 3, 1, 1, 8, 'Audi aa', 'nddj ffjbakjfba jdddddddddddddddsak', 20000.00, 'buy', 'car', 'other', 'Audi', 'A4', 2022, 'used', 20000, 'automatic', 'diesel', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, 1, '2025-11-07 21:11:00', NULL, '[\"\\/storage\\/properties\\/wN26QaDM5UeUWjt4VKxW2xjw8LzD7FKnE3t2iNun.jpg\",\"\\/storage\\/properties\\/XM4gkbDT8AABoxj80BLJjiQMJJfL8Uy83nrI38Sc.jpg\"]', NULL, NULL, 'audi-aa-nLXfth', NULL, 5, 0, 0, 1, 0, NULL, '2025-11-07 20:52:51', '2025-11-07 21:40:57', '2025-11-07 21:40:57', NULL),
(3, 3, 3, 29, 403, 'ac jfkgfgdsngsng', 'ac jfkgfgdsngsngac jfkgfgdsngsngac jfkgfgdsngsngac jfkgfgdsngsngac jfkgfgdsngsngac jfkgfgdsngsng', 22111111111.00, 'buy', 'electronics', 'other', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'pending', 0.00, 0, NULL, NULL, NULL, '[\"\\/storage\\/properties\\/K49BiiMSGfGF7fy0A1ICWIMbjJOl3cTsKG1Sz7Ou.jpg\"]', NULL, NULL, 'ac-jfkgfgdsngsng-mgFp2O', NULL, 0, 0, 0, 0, 0, NULL, '2025-11-07 21:22:30', '2025-11-07 21:40:52', '2025-11-07 21:40:52', NULL),
(4, 3, 1, 3, 23, 'ac jfkgfgdsngsng', 'ac jfkgfgdsngsngac jfkgfgdsngsngac jfkgfgdsngsngac jfkgfgdsngsng', 20000000.00, 'buy', 'car', 'other', 'Audi', 'S7', 2020, 'used', 20000, 'automatic', 'petrol', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, 1, '2025-11-07 21:42:03', NULL, '[\"\\/storage\\/properties\\/tt7UQUn8fDBwOe8EgEFWdpV21XckjN6a3Myhe8EN.jpg\"]', NULL, NULL, 'ac-jfkgfgdsngsng-y15E95', NULL, 12, 0, 0, 1, 0, NULL, '2025-11-07 21:41:43', '2025-11-08 08:03:37', '2025-11-08 08:03:37', NULL),
(5, 3, 1, 8, 58, 'part time job', 'part time jobpart time jobpart time jobpart time jobpart time jobpart time jobpart time jobpart time jobpart time jobpart time jobpart time job', 15000.00, 'buy', 'job', 'other', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, 2, '2025-11-07 22:08:48', NULL, '[\"\\/storage\\/properties\\/bxccGqGDpAeNIdl0rbAtSacvh0xO70ipgIu2pdlb.jpg\"]', NULL, NULL, 'part-time-job-gRkqa5', NULL, 3, 0, 0, 1, 0, NULL, '2025-11-07 21:55:47', '2025-11-08 07:31:14', '2025-11-08 07:31:14', NULL),
(6, 2, 1, 2, 15, 'ssafffffffffffffff', 'safffffffffffffffffffffffffffffffffffffffff', 2000000.00, 'buy', 'electronics', 'other', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, NULL, NULL, NULL, '[\"\\/storage\\/properties\\/FnHDATHlnqIWqvJzWD3wfBG0l2VDeRMrfrs7HNVp.png\"]', NULL, NULL, 'ssafffffffffffffff-sxR4Uu', NULL, 0, 0, 0, 1, 0, NULL, '2025-11-08 06:40:12', '2025-11-08 06:40:36', '2025-11-08 06:40:36', NULL),
(7, 3, 1, 8, 57, 'saaaaaaaaaaaaaaaaaaaa', 'saaaaaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaaaaaa', 2000000.00, 'buy', 'electronics', 'other', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, 2, '2025-11-08 06:41:53', NULL, '[\"\\/storage\\/properties\\/3x61XM4Jtthvef6OOQjTJGeXTKgF7CJuoSPy4lcQ.png\"]', NULL, NULL, 'saaaaaaaaaaaaaaaaaaaa-iMjthS', NULL, 4, 0, 0, 1, 0, NULL, '2025-11-08 06:41:08', '2025-11-08 07:17:21', '2025-11-08 07:17:21', NULL),
(8, 3, 1, 3, 23, 'townhouse', 'dsggggggggggggggggggggggggggggggggggggggggggggggg', 2000000.00, 'buy', 'property', 'townhouse', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, 3, 125.00, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, 2, '2025-11-08 07:01:22', NULL, '[\"\\/storage\\/properties\\/hFfVdQmVJ3LVDOu8Z2sqcpFpNJ4x8ReqMPoJhU7q.png\"]', NULL, NULL, 'townhouse-P21koW', NULL, 3, 0, 0, 1, 0, NULL, '2025-11-08 07:01:12', '2025-11-08 07:31:17', '2025-11-08 07:31:17', NULL),
(9, 3, 1, 8, 54, 'ac ac ac', 'ac ac acac ac acac ac acac ac acac ac acac ac acac ac acac ac acac ac acac ac acac ac acac ac acac ac ac', 2004.00, 'buy', 'electronics', 'other', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'pending', 0.00, 0, NULL, NULL, NULL, '[\"\\/storage\\/properties\\/iu59Wif5QoKuUBf1wl262FtkNfKeCvkcJcLdV2y4.png\"]', NULL, NULL, 'ac-ac-ac-nXuF0z', NULL, 0, 0, 0, 0, 0, NULL, '2025-11-08 07:14:26', '2025-11-08 07:17:22', '2025-11-08 07:17:22', NULL),
(10, 3, 1, 8, 57, 'ac ac ad', 'ac ac adac ac adac ac adac ac adac ac adac ac adac ac adac ac adac ac adac ac adac ac ad', 2000000.00, 'buy', 'electronics', 'other', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'pending', 0.00, 0, NULL, NULL, NULL, '[\"\\/storage\\/properties\\/jDQQbQHavfPUM2YGukuc7wIoH87NLA6IFxgPToII.png\"]', NULL, NULL, 'ac-ac-ad-TlBfn8', NULL, 0, 0, 0, 0, 0, NULL, '2025-11-08 07:18:04', '2025-11-08 07:24:37', '2025-11-08 07:24:37', NULL),
(11, 3, 1, 3, 25, 'acaaccccc', 'acaacccccacaacccccacaacccccacaacccccacaacccccacaacccccacaacccccacaacccccacaacccccacaacccccacaacccccacaaccccc', 2000000.00, 'buy', 'electronics', 'other', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'air_conditioner', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, 2, '2025-11-08 07:27:48', NULL, '[\"\\/storage\\/properties\\/DMWitYBsPw4WTbaq4e0y0JdpZeal3aV2peLwXKux.png\"]', NULL, NULL, 'acaaccccc-ZkMbpv', NULL, 2, 0, 0, 1, 0, NULL, '2025-11-08 07:27:11', '2025-11-08 07:28:48', '2025-11-08 07:28:48', NULL),
(12, 3, 1, 1, 6, 'csaaaaaaaaaaaaaaaa', 'csaaaaaaaaaaaaaaaacsaaaaaaaaaaaaaaaacsaaaaaaaaaaaaaaaacsaaaaaaaaaaaaaaaacsaaaaaaaaaaaaaaaacsaaaaaaaaaaaaaaaa', 2000000.00, 'buy', 'electronics', 'other', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'blender', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'pending', 0.00, 0, NULL, NULL, NULL, '[\"\\/storage\\/properties\\/STxtu2ItRJUEHCKAIiFJTvPNcElFiZ54NAWVUWaX.png\"]', NULL, NULL, 'csaaaaaaaaaaaaaaaa-kf7dLN', NULL, 0, 0, 0, 0, 0, NULL, '2025-11-08 07:29:10', '2025-11-08 07:31:08', '2025-11-08 07:31:08', NULL),
(13, 3, 1, 3, 30, 'sadsadsa', 'sadsadsasadsadsasadsadsasadsadsasadsadsasadsadsasadsadsasadsadsasadsadsa', 1999998.00, 'buy', 'electronics', 'other', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'air_conditioner', 'samsung1', 'used_like_new', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, 2, '2025-11-08 07:33:01', NULL, '[\"\\/storage\\/properties\\/DoN9c5dcvjjIn7ii5hppJ6BUjJedJjya1Xnb6Zi7.png\"]', NULL, NULL, 'sadsadsa-72INZp', NULL, 1, 0, 0, 1, 0, NULL, '2025-11-08 07:32:36', '2025-11-08 08:03:38', '2025-11-08 08:03:38', NULL),
(14, 3, 1, 10, 67, 'areaareaareaareaareaarea', 'areaareaareaareaareaareaareaareaareaareaareaareaareaareaareaareaareaareaareaarea', 2000000.00, 'buy', 'property', 'townhouse', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, 4, 120.00, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, 2, '2025-11-08 07:35:03', NULL, '[\"\\/storage\\/properties\\/BACy3CsuVPKi5RUJwONu6feDjNCZIWnV2YGUIXHg.png\"]', NULL, NULL, 'areaareaareaareaareaarea-7fS4WY', NULL, 0, 0, 0, 1, 0, NULL, '2025-11-08 07:34:37', '2025-11-08 08:03:35', '2025-11-08 08:03:35', NULL),
(15, 2, 1, 2, 20, 'iphone11', 'iphone11iphone11iphone11iphone11iphone11iphone11iphone11iphone11iphone11iphone11iphone11iphone11iphone11iphone11iphone11iphone11iphone11', 20000.00, 'buy', 'mobile', 'other', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Apple', 'iPhone 11', '64gb', NULL, 'new', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, NULL, NULL, NULL, '[\"\\/storage\\/properties\\/3OQKpMI3cUFFXt7XWayd2mc8cmk5Lmr3BmRujWDB.png\"]', NULL, NULL, 'iphone11-BdaWke', NULL, 8, 0, 0, 1, 0, NULL, '2025-11-08 07:36:25', '2025-11-08 09:47:36', NULL, NULL),
(16, 2, 1, 3, 23, 'jobjobjobjobjobjobjobjobjobjob', 'jobjobjobjobjobjobjobjobjobjobjobjobjobjob', 2000000.00, 'buy', 'job', 'other', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'administration', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, NULL, NULL, NULL, '[\"\\/storage\\/properties\\/ubnrORcqsb7ZDX3XFU0YVVlIzU1i91Z6Y7bLUZt0.png\"]', NULL, NULL, 'jobjobjobjobjobjobjobjobjobjob-AMtS3R', NULL, 1, 0, 0, 1, 0, NULL, '2025-11-08 07:37:40', '2025-11-08 07:49:53', '2025-11-08 07:49:53', NULL),
(17, 2, 1, 3, 23, 'jobjobjobjobjobjobjobjobjobjobjobjobjobjobjobjobjobjobjoba', 'jobjobjobjobjobjobjobjobjobjobjobjobjobjobjobjobjobjobjob', 2000000.00, 'buy', 'job', 'other', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'architecture', NULL, 'part_time', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, NULL, NULL, NULL, '[\"\\/storage\\/properties\\/2GYR2Pybe4D6YW3GepnOrbIAcaW011EjDEp03KzA.png\"]', NULL, NULL, 'jobjobjobjobjobjobjobjobjobjobjobjobjobjobjobjobjobjobjoba-bxlsZL', NULL, 1, 0, 0, 1, 0, NULL, '2025-11-08 07:48:51', '2025-11-08 07:49:50', '2025-11-08 07:49:50', NULL),
(18, 2, 1, 2, 17, 'dofajbfbi', 'dofajbfbidofajbfbidofajbfbidofajbfbidofajbfbi', 1999.00, 'buy', 'job', 'other', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'consulting', NULL, 'contract', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, NULL, NULL, NULL, '[\"\\/storage\\/properties\\/b3KbTTLicVe0Tnj6tohvxoOYWMMjvhgARzl8MNXI.png\"]', NULL, NULL, 'dofajbfbi-beyWYc', NULL, 0, 0, 0, 1, 0, NULL, '2025-11-08 07:53:42', '2025-11-08 07:56:29', '2025-11-08 07:56:29', NULL),
(19, 2, 1, 6, 47, 'wsafasfaf', 'wsafasfafwsafasfafwsafasfafwsafasfafwsafasfafwsafasfafwsafasfafwsafasfaf', 2000000.00, 'buy', 'job', 'other', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'banking', NULL, 'contract', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, NULL, NULL, NULL, '[\"\\/storage\\/properties\\/Ic4RM7r8JSBDnAlljaDmcA1MCNFWXhyhqqVglI8D.png\"]', NULL, NULL, 'wsafasfaf-EPDASf', NULL, 0, 0, 0, 1, 0, NULL, '2025-11-08 07:54:59', '2025-11-08 07:56:31', '2025-11-08 07:56:31', NULL),
(20, 2, 1, 3, 30, 'wadsafsaf', 'wadsafsafwadsafsafwadsafsafwadsafsafwadsafsafwadsafsaf', 2000.00, 'buy', 'job', 'other', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'consulting', NULL, 'contract', 'remote', NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, NULL, NULL, NULL, '[\"\\/storage\\/properties\\/OWWLWVWUBo0GRoA67z6DL2gwuXZC0BSJPUcv6bG5.png\"]', NULL, NULL, 'wadsafsaf-92Ajh6', NULL, 2, 0, 0, 1, 0, NULL, '2025-11-08 07:56:56', '2025-11-08 07:58:38', '2025-11-08 07:58:38', NULL),
(21, 2, 1, 3, 29, 'sadsadsadsa', 'sadsadsadsasadsadsadsasadsadsadsasadsadsadsasadsadsadsa', 2000.00, 'buy', 'job', 'other', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'architecture', NULL, 'part_time', 'remote', NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, NULL, NULL, NULL, '[\"\\/storage\\/properties\\/3BTMGGOngQJ3e1PNLFOMAVLLO2vdPApqhn62jJEX.png\"]', NULL, NULL, 'sadsadsadsa-MldH3L', NULL, 9, 0, 0, 1, 0, NULL, '2025-11-08 08:00:56', '2025-11-08 09:47:41', NULL, NULL),
(22, 2, 1, 3, 30, 'book a vehicle', 'book a vehicle book a vehicle book a vehicle book a vehicle book a vehicle book a vehicle book a vehicle book a vehicle book a vehicle book a vehicle book a vehicle book a vehicle book a vehicle book a vehicle', 2000.00, 'buy', 'vehicle_booking', 'other', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'bus', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, NULL, NULL, NULL, '[\"\\/storage\\/properties\\/pVvwFdoaEx6m2BzyXXxGoDXtsPWuxOIqlxWdXewI.png\"]', NULL, NULL, 'book-a-vehicle-X3X6LS', NULL, 3, 0, 0, 1, 0, NULL, '2025-11-08 08:04:16', '2025-11-08 08:09:51', '2025-11-08 08:09:51', NULL),
(23, 2, 1, 3, 28, 'dsvdsv', 'dsvdsvdsvdsvdsvdsvdsvdsvdsvdsvdsvdsvdsvdsvdsvdsvdsvdsv', 2000000.00, 'buy', 'vehicle_booking', 'other', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'limousine', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, NULL, NULL, NULL, '[\"\\/storage\\/properties\\/pIdY8tvNc9B7RP1C8OUj3WSg5KhXA9jN7pr4qqNX.png\"]', NULL, NULL, 'dsvdsv-oGkcsT', NULL, 1, 0, 0, 1, 0, NULL, '2025-11-08 08:05:18', '2025-11-08 08:09:53', '2025-11-08 08:09:53', NULL),
(24, 2, 1, 3, 30, 'bdjsfbdsdsjbfbdo', 'bdjsfbdsdsjbfbdobdjsfbdsdsjbfbdobdjsfbdsdsjbfbdobdjsfbdsdsjbfbdo', 2000000.00, 'buy', 'vehicle_booking', 'other', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'bus', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, NULL, NULL, NULL, '[\"\\/storage\\/properties\\/sA48Wt050Q0dCmKAPjxJ2VtH7hKAwyaRchWxpDx7.png\"]', NULL, NULL, 'bdjsfbdsdsjbfbdo-DYVj9i', NULL, 2, 0, 0, 1, 0, NULL, '2025-11-08 08:10:53', '2025-11-08 08:13:32', '2025-11-08 08:13:32', NULL),
(25, 2, 1, 7, 50, 'rgrgwefg', 'ewgewgewgekjbbbbbbbbbb', 2000.00, 'buy', 'vehicle_booking', 'other', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'hatchback', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, NULL, NULL, NULL, '[\"\\/storage\\/properties\\/J8SWRaTcess2gwA3CLKaTbQOnP2CdZOWyrznWVsg.png\"]', NULL, NULL, 'rgrgwefg-dgil0c', NULL, 3, 0, 0, 1, 0, NULL, '2025-11-08 08:14:01', '2025-11-08 09:43:58', NULL, NULL),
(26, 2, 1, 3, 24, 'nkdlfklnsfnsknsf', 'nsklfsnfsanfkslafnsalfsnkfsanklsaf', 2000000.00, 'buy', 'doctor_booking', 'other', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 'emergency', 'anesthesiology', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, NULL, NULL, NULL, '[\"\\/storage\\/properties\\/0vcNZNTHpqO4De0t81Fq2l1YHOuRG1vhHdXhTPPU.png\"]', NULL, NULL, 'nkdlfklnsfnsknsf-XhHwi7', NULL, 14, 0, 0, 1, 0, NULL, '2025-11-08 08:14:44', '2025-11-08 10:07:26', NULL, NULL),
(27, 2, 1, 3, 21, 'fdfdsfdsf', 'dsfdsfdsfdsfdfdsdsfdsfdsfdsfdfdsdsfdsfdsfdsfdfds', 2000000.00, 'buy', 'electronics', 'other', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'coffee_maker', 'LG', 'used_like_new', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, NULL, NULL, NULL, '[\"\\/storage\\/properties\\/fndVTZFUypFnVSy9gZ68e3BBCnsiOfeaEMwCjDJT.png\"]', NULL, NULL, 'fdfdsfdsf-aXM6MC', NULL, 12, 0, 0, 1, 0, NULL, '2025-11-08 08:15:57', '2025-11-08 10:05:01', NULL, NULL),
(28, 2, 1, 3, 22, 'carcarcarcarcarcarcarcarcarcarcarcarcar', 'carcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcarcar', 2000000.00, 'buy', 'car', 'other', 'Ford', 'Edge', 2020, 'used', 19999, 'automatic', 'petrol', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, NULL, NULL, NULL, '[\"\\/storage\\/properties\\/uozZ48u2ZGB7cZFe4Pdw7kA4K6xVqVz6zn6FJ1Xj.png\"]', NULL, NULL, 'carcarcarcarcarcarcarcarcarcarcarcarcar-8Ypdr1', NULL, 5, 0, 0, 1, 0, NULL, '2025-11-08 08:16:47', '2025-11-08 10:06:44', NULL, NULL),
(29, 2, 1, 8, 55, 'safdffdsfaf', 'safdffdsfafsafdffdsfafsafdffdsfafsafdffdsfafsafdffdsfafsafdffdsfafsafdffdsfafsafdffdsfafsafdffdsfafsafdffdsfafsafdffdsfafsafdffdsfafsafdffdsfafsafdffdsfafsafdffdsfafsafdffdsfafsafdffdsfafsafdffdsfaf', 2000000.00, 'buy', 'property', 'building', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, 3, 125.00, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, NULL, NULL, NULL, '[\"\\/storage\\/properties\\/xOhbzoX6ne3026dJU4omQDkvtWlnfFTb3LLiRyA4.png\"]', NULL, NULL, 'safdffdsfaf-PSM6WP', NULL, 14, 0, 0, 1, 0, NULL, '2025-11-08 08:17:21', '2025-11-08 10:04:51', NULL, NULL),
(30, 3, 1, 9, 59, 'Apartment', 'Apartment Apartment Apartment Apartment Apartment', 2000000.00, 'rent', 'property', 'apartment', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 120.00, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, 2, '2025-11-08 09:58:19', NULL, '[\"\\/storage\\/properties\\/yChx9uOF7vINuxq7zK0VXWPik7R2oj5owB72h89Y.png\"]', NULL, NULL, 'apartment-CX12Jd', NULL, 0, 0, 0, 1, 0, NULL, '2025-11-08 09:48:29', '2025-11-08 10:06:08', '2025-11-08 10:06:08', NULL),
(31, 3, 1, 3, 30, 'Fiat TIP', 'Fiat TIPFiat TIPFiat TIPFiat TIPFiat TIPFiat TIP', 2000000.00, 'buy', 'car', 'other', 'Fiat', 'Tipo', 2015, 'used', 149999, 'automatic', 'diesel', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, 0, 0, NULL, NULL, NULL, 'approved', 0.00, 0, 2, '2025-11-08 09:59:57', NULL, '[\"\\/storage\\/properties\\/EHV36omrqxcKer0bxSabPidc47QiP8yTWnga6cuL.png\"]', NULL, NULL, 'fiat-tip-R2M1Di', NULL, 0, 0, 0, 1, 0, NULL, '2025-11-08 09:59:15', '2025-11-08 10:06:09', '2025-11-08 10:06:09', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `property_comments`
--

CREATE TABLE `property_comments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `property_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text NOT NULL,
  `likes` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `property_comment_likes`
--

CREATE TABLE `property_comment_likes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `comment_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('9RA8j0vxewsrwdNaXjIa5qpXqaXynaEWombiJeXL', NULL, '52.167.144.67', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm) Chrome/116.0.1938.76 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiODJmM0dBREh5bkJsSUZCWktRWDZqZ1NEaWI5S0FjZXYwTHY2TXB5cSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHBzOi8vM3FhcmF0eS5pY3Uvcm9ib3RzLnR4dCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1762532024),
('DKR5iZRrUirLd0Is6vNE7AeKrXYAn6cILgEsRY7c', NULL, '66.249.73.13', 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZExMa2JZWm4wS2NkNU41a1BWazVOaFRjOGpxNGpINXdHMXFwUjd6ciI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHBzOi8vM3FhcmF0eS5pY3Uvcm9ib3RzLnR4dCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1762536949),
('lOsfFBuyXestX6TqYVOqB1VDK8Y3MOr90f0SAV03', NULL, '104.210.140.130', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN1ZrdlNza3h3SmVwaXJncnNpdEdQT3lnMDhxTUV6YlFybmtFSVBLUSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHBzOi8vM3FhcmF0eS5pY3Uvcm9ib3RzLnR4dCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1762586552),
('n6raFA990ZXOZcqu6Txjb6eBjUtgnjf3V4UQlKTu', NULL, '52.167.144.67', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm) Chrome/116.0.1938.76 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRklaRmFPVGo3WmlPR2NhelVGTVY0aURZVDVSMVQ3TDFDdnVnWXRNOCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzQ6Imh0dHBzOi8vd3d3LjNxYXJhdHkuaWN1L3JvYm90cy50eHQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1762523307);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `is_founder` tinyint(1) NOT NULL DEFAULT 0,
  `is_seller` tinyint(1) NOT NULL DEFAULT 1,
  `banned` tinyint(1) NOT NULL DEFAULT 0,
  `is_online` tinyint(1) NOT NULL DEFAULT 0,
  `last_seen_at` timestamp NULL DEFAULT NULL,
  `last_activity_at` timestamp NULL DEFAULT NULL,
  `address` text DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `avatar`, `email`, `phone`, `email_verified_at`, `password`, `is_admin`, `is_founder`, `is_seller`, `banned`, `is_online`, `last_seen_at`, `last_activity_at`, `address`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Salaheldin', 'salah', NULL, 'salaheldindr@gmail.com', '01012221302', NULL, '$2y$12$ZFWYyy62bCpeg0YPn34osulPRqfbnf0Wxf8.U.iVmxh8H6QD4PMNG', 0, 1, 0, 0, 1, NULL, '2025-11-07 21:40:29', NULL, NULL, '2025-11-07 12:07:50', '2025-11-07 21:40:29'),
(2, 'Salaheldin', 'salah1', NULL, 'salahterminator@gmail.com', '01012221301', NULL, '$2y$12$w7gPRN6wecaJ3KD4lWcoNeEutLdZR1P0bNAQp0XRHtpSHQTF1p38i', 1, 0, 1, 0, 1, NULL, '2025-11-08 10:06:22', NULL, NULL, '2025-11-07 20:12:45', '2025-11-08 10:06:22'),
(3, 'salaheldin', 'salah2', NULL, 'ahmed213222q@gmail.com', '01128024909', NULL, '$2y$12$oBrGVVD5dpUlBVu7B4MPx.VqTM4DQcl4YD9S5ttYMu6q3xyKGWs56', 0, 0, 1, 0, 1, NULL, '2025-11-08 10:06:47', NULL, NULL, '2025-11-07 20:16:13', '2025-11-08 10:06:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookings_user_id_foreign` (`user_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chats_sender_id_receiver_id_created_at_index` (`sender_id`,`receiver_id`,`created_at`),
  ADD KEY `chats_property_id_created_at_index` (`property_id`,`created_at`),
  ADD KEY `chats_is_read_receiver_id_index` (`is_read`,`receiver_id`),
  ADD KEY `chats_deleted_by_sender_deleted_by_receiver_index` (`deleted_by_sender`,`deleted_by_receiver`),
  ADD KEY `chats_sender_id_index` (`sender_id`),
  ADD KEY `chats_receiver_id_index` (`receiver_id`),
  ADD KEY `chats_is_read_index` (`is_read`),
  ADD KEY `chats_created_at_index` (`created_at`),
  ADD KEY `chats_sender_id_receiver_id_index` (`sender_id`,`receiver_id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cities_governorate_id_is_active_index` (`governorate_id`,`is_active`),
  ADD KEY `cities_governorate_id_index` (`governorate_id`),
  ADD KEY `cities_is_active_index` (`is_active`);

--
-- Indexes for table `contact_requests`
--
ALTER TABLE `contact_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contact_requests_user_id_foreign` (`user_id`),
  ADD KEY `contact_requests_status_priority_created_at_index` (`status`,`priority`,`created_at`),
  ADD KEY `contact_requests_assigned_to_status_index` (`assigned_to`,`status`),
  ADD KEY `contact_requests_category_status_index` (`category`,`status`),
  ADD KEY `contact_requests_email_created_at_index` (`email`,`created_at`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `countries_code_unique` (`code`),
  ADD KEY `countries_code_index` (`code`),
  ADD KEY `countries_is_active_index` (`is_active`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `favorites_user_id_property_id_unique` (`user_id`,`property_id`),
  ADD KEY `favorites_user_id_index` (`user_id`),
  ADD KEY `favorites_property_id_index` (`property_id`);

--
-- Indexes for table `governorates`
--
ALTER TABLE `governorates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `governorates_is_active_index` (`is_active`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `menu_items`
--
ALTER TABLE `menu_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_user_id_foreign` (`user_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `password_reset_tokens_token_unique` (`token`),
  ADD KEY `password_reset_tokens_user_id_expires_at_index` (`user_id`,`expires_at`),
  ADD KEY `password_reset_tokens_token_expires_at_index` (`token`,`expires_at`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `properties_slug_unique` (`slug`),
  ADD KEY `properties_approved_by_foreign` (`approved_by`),
  ADD KEY `properties_status_rent_or_buy_category_index` (`status`,`rent_or_buy`),
  ADD KEY `properties_governorate_id_city_id_status_index` (`governorate_id`,`city_id`,`status`),
  ADD KEY `properties_user_id_status_index` (`user_id`,`status`),
  ADD KEY `properties_price_rent_or_buy_index` (`price`,`rent_or_buy`),
  ADD KEY `properties_is_featured_status_index` (`is_featured`,`status`),
  ADD KEY `properties_created_at_status_index` (`created_at`,`status`),
  ADD KEY `properties_listing_type_status_index` (`listing_type`,`status`),
  ADD KEY `properties_country_id_governorate_id_city_id_index` (`country_id`,`governorate_id`,`city_id`),
  ADD KEY `properties_status_index` (`status`),
  ADD KEY `properties_is_active_index` (`is_active`),
  ADD KEY `properties_is_featured_index` (`is_featured`),
  ADD KEY `properties_governorate_id_index` (`governorate_id`),
  ADD KEY `properties_city_id_index` (`city_id`),
  ADD KEY `properties_category_index` (`category`),
  ADD KEY `properties_rent_or_buy_index` (`rent_or_buy`),
  ADD KEY `properties_user_id_index` (`user_id`),
  ADD KEY `properties_created_at_index` (`created_at`),
  ADD KEY `properties_status_is_active_index` (`status`,`is_active`),
  ADD KEY `properties_governorate_id_city_id_index` (`governorate_id`,`city_id`);

--
-- Indexes for table `property_comments`
--
ALTER TABLE `property_comments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `property_comments_property_id_user_id_unique` (`property_id`,`user_id`),
  ADD KEY `property_comments_user_id_foreign` (`user_id`);

--
-- Indexes for table `property_comment_likes`
--
ALTER TABLE `property_comment_likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `property_comment_likes_comment_id_user_id_unique` (`comment_id`,`user_id`),
  ADD KEY `property_comment_likes_user_id_foreign` (`user_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_phone_unique` (`phone`),
  ADD KEY `users_is_admin_index` (`is_admin`),
  ADD KEY `users_is_seller_index` (`is_seller`),
  ADD KEY `users_is_founder_index` (`is_founder`),
  ADD KEY `users_banned_index` (`banned`),
  ADD KEY `users_username_index` (`username`),
  ADD KEY `users_created_at_index` (`created_at`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=460;

--
-- AUTO_INCREMENT for table `contact_requests`
--
ALTER TABLE `contact_requests`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=193;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `governorates`
--
ALTER TABLE `governorates`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menu_items`
--
ALTER TABLE `menu_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `property_comments`
--
ALTER TABLE `property_comments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `property_comment_likes`
--
ALTER TABLE `property_comment_likes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `chats_property_id_foreign` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chats_receiver_id_foreign` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chats_sender_id_foreign` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `cities_governorate_id_foreign` FOREIGN KEY (`governorate_id`) REFERENCES `governorates` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `contact_requests`
--
ALTER TABLE `contact_requests`
  ADD CONSTRAINT `contact_requests_assigned_to_foreign` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `contact_requests_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_property_id_foreign` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorites_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD CONSTRAINT `password_reset_tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `properties`
--
ALTER TABLE `properties`
  ADD CONSTRAINT `properties_approved_by_foreign` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `properties_city_id_foreign` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`),
  ADD CONSTRAINT `properties_country_id_foreign` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `properties_governorate_id_foreign` FOREIGN KEY (`governorate_id`) REFERENCES `governorates` (`id`),
  ADD CONSTRAINT `properties_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `property_comments`
--
ALTER TABLE `property_comments`
  ADD CONSTRAINT `property_comments_property_id_foreign` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `property_comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `property_comment_likes`
--
ALTER TABLE `property_comment_likes`
  ADD CONSTRAINT `property_comment_likes_comment_id_foreign` FOREIGN KEY (`comment_id`) REFERENCES `property_comments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `property_comment_likes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;
SET FOREIGN_KEY_CHECKS=1;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
