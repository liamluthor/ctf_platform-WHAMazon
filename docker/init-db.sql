-- WHAMazon Database Initialization
-- Auto-generated: 2026-01-02T00:09:39.660Z
-- DO NOT EDIT MANUALLY

-- Drop existing tables
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS session CASCADE;

-- Users (24 rows)
INSERT INTO users (id, username, password, email, is_admin, created_at) VALUES (
  '71d5535c-bdeb-4430-9bb9-a540b8310e3a',
  'testuser',
  '9bceaa1212e470f5bf600f800a145f49d89c5b479bd675baa8ef59d5366c674a7878def3ce4ffce3c6e8a3d85256ef1293297e30f47e727814d5bef82fad111e.2f50da153a6b679e4228c41de9eeb1a2',
  'test@example.com',
  false,
  '2026-01-01T18:26:46.533Z'
);
INSERT INTO users (id, username, password, email, is_admin, created_at) VALUES (
  '393f8be2-cf96-4279-b737-cad26763fc2f',
  'adminuser',
  '654d967c068e3074bcde6c22af3cd688fd8da436c0526cd6d4cee490f5b73584fd93979232eb0ca95f11eac725a8661f615d9be598e423cfeb9fd13338ee0adf.6b192b65eff0bf140e52cc9bb110763f',
  'admin@example.com',
  true,
  '2026-01-01T18:28:40.231Z'
);
INSERT INTO users (id, username, password, email, is_admin, created_at) VALUES (
  '5cc83faf-e037-4da6-b10b-1836742e20f6',
  'user1767310199',
  '5e8b8761fe79b62da5e8c5a28ed043c8d346312b15ca2dfd1d9ccc45849ed5f2e4174a30c756b6430bb9638e3e18e8386824aae6fa7cf08e009c75e2081203f5.dfa71d0d7e1e3d02fc0b5c808a4e5215',
  'user1767310199@test.com',
  false,
  '2026-01-01T18:29:59.297Z'
);
INSERT INTO users (id, username, password, email, is_admin, created_at) VALUES (
  '3174080b-074a-46e6-abb1-67529ff8b8b9',
  'newuser1767310199',
  'c82caf21e2486ad6924542438665ce0df4dbbb9c04ac20f588918248e53ec3170279f103e6e3d5bb45271eb29e54f0c622323520e7ea033acc8371baea350ca9.17da2db76b8c2ecee2fb1404539b502d',
  'new1767310199@test.com',
  false,
  '2026-01-01T18:29:59.361Z'
);
INSERT INTO users (id, username, password, email, is_admin, created_at) VALUES (
  '5c305de5-fb5c-41cb-bffb-0ea60c51a8d2',
  'admin',
  '6107ad690e70c626a5b8857e84101b850e8f3c6d989c655b2fb1ad28e4ba721b592002aa0cf97891983a8f3eff76288b95e59e2c4a1cf33852105f0ebd1549bf.49bb6e4428b3b68768bc934193fb16b9',
  'admin@sitesdown.net',
  false,
  '2026-01-01T18:31:33.894Z'
);
INSERT INTO users (id, username, password, email, is_admin, created_at) VALUES (
  '88cbb7b8-efe0-4bf3-bfd9-ace4a22068f7',
  'jsmith',
  '9a7910c5956e2c0ce204eeada5a361cc91a932a9cf2fbbb1c1eb35cec2814949c87bbe1ac668a061a54efe5ac1d5a1a73c7d4baedb6de1c807b1a908dd01f053.e6df98932d8c35e96501cfd481a1876e',
  'john.smith@email.com',
  false,
  '2026-01-01T19:03:47.536Z'
);
INSERT INTO users (id, username, password, email, is_admin, created_at) VALUES (
  'b7994958-8559-4a90-9b95-1403f8e99c5f',
  'sarah_jones',
  'c00a5e7f32d7814152ed5a55e00a1ec545afb18795eecd0a1d28b73ad097f44e02a3e90c078513633754ec7508ca1c9b1928b517dc4403e415c398147f006b0f.5fafb901b4c70a82da8990effaf1c005',
  'sarah.jones@email.com',
  false,
  '2026-01-01T19:03:47.587Z'
);
INSERT INTO users (id, username, password, email, is_admin, created_at) VALUES (
  '3ba6671e-562c-4161-9629-a837e7855b17',
  'mike_wilson',
  '710ca1890549f63ffb431a2c07b7ef06efd435d912fbf44dfe5e02879e070507c621cc68241a3974569565de4ba3236e22783708d3a49e0a98b8087bae028941.4e5c4f2a469b7aadd495056f4315ca1d',
  'mike.w@email.com',
  false,
  '2026-01-01T19:03:47.636Z'
);
INSERT INTO users (id, username, password, email, is_admin, created_at) VALUES (
  '0feb1155-0082-458b-9f7d-ece3cea81207',
  'emily_brown',
  'b5831087be6d5e5e916f6ddf7becc34f89f6f31446c1a20c1df994b0964fd5a207d968ece9567d6ac52864002222db2b8f6c1f159eb7ce5a092219a05260eb59.b15ab5fd9ce1a747200d94cba2b36a10',
  'emily.b@email.com',
  false,
  '2026-01-01T19:03:47.683Z'
);
INSERT INTO users (id, username, password, email, is_admin, created_at) VALUES (
  'fc70d203-4d64-434c-82c8-30b259828d15',
  'david_lee',
  '5b259b4aae6d6e6f47c5b86a6f827660ffeba6c46b37305c5cad3a6a05abb1c161da6e5693fc85892b8819fe26861889b4a74af78d2dfa3a7c62a00a9829dc90.08af518fc5e13559f8fd45623c243631',
  'david.lee@email.com',
  false,
  '2026-01-01T19:03:47.734Z'
);
INSERT INTO users (id, username, password, email, is_admin, created_at) VALUES (
  'ffaabff3-fe39-4766-87d4-33bfc8e7c448',
  'lisa_garcia',
  '49b7e1c4e6db38856716c721806454d44d726e0fe989ffddcedadb9c61bae486d5fdbb652b01eaebb7cb21a5304da2524952950512e00d995bb28035384136da.b03bb16b181b89c81081b08957bc38e4',
  'lisa.garcia@email.com',
  false,
  '2026-01-01T19:03:47.775Z'
);
INSERT INTO users (id, username, password, email, is_admin, created_at) VALUES (
  '491c8ea3-63d3-4035-bcc3-d136f1ff1048',
  'kevin_martin',
  '4ae06648bdc6c602aa8cb79ed1c4bb4d78e3662d0a9385fb9f01ba8b3b331e738494d3a628400a01352c4f155db91ae1edb7a2cb1864df1fce80e42199aebabe.579882ed92bc3974719da1fd733361bd',
  'kevin.m@email.com',
  false,
  '2026-01-01T19:03:47.815Z'
);
INSERT INTO users (id, username, password, email, is_admin, created_at) VALUES (
  '1a711c6c-87ad-4de3-a602-0b23d393c5a9',
  'jessica_davis',
  '489a67e25ea05b0ca39444780d6c95f2353682e2dfd0db6d2133b5a482b28f33df09344c391ae39aa8492e3f2832c11b1cbcf2eff60148d9713424d43e9416b3.298261947b115a4a64dce53397e64282',
  'jessica.d@email.com',
  false,
  '2026-01-01T19:03:47.855Z'
);
INSERT INTO users (id, username, password, email, is_admin, created_at) VALUES (
  '4a3d3f23-e115-41bd-9810-04bf196ac42e',
  'robert_taylor',
  '39f0d47c8b432726fb30a05b379cebcf8b1ad3585de3a43b61285cbe7787643deef2ded33150b11f05585fec7df797ae595d96dc00ce1cde45c88729ff023199.b8d76c05864d933225723d1db0b6f379',
  'robert.t@email.com',
  false,
  '2026-01-01T19:03:47.895Z'
);
INSERT INTO users (id, username, password, email, is_admin, created_at) VALUES (
  'e967945b-a63e-4769-92ae-a1127b4b0baa',
  'amanda_white',
  'dd94aaaa3dea4a6502142f1247cbed25bbe5571fbb4555dc77d7dcd0958e6cd680d9237cfbe45c5cf496a6ce58876d2a4ca66078e775d25ae577c9455807f693.8f8fcc1ec56b892a0aa65353c95f5cff',
  'amanda.w@email.com',
  false,
  '2026-01-01T19:03:47.936Z'
);
INSERT INTO users (id, username, password, email, is_admin, created_at) VALUES (
  'a663ac81-e1b6-47af-a7b4-3da24cef6b7c',
  'chris_anderson',
  'f731f28ef5c9d390d1bf1347536b547caa3ac8f27b3bb8906f6ea73ecd5a888af3646e7090703b58a01dd38b42afa889f4d372af8d45130fe772f0b9f688d2a6.12d71aea2552705d5fdd6c85236ab043',
  'chris.a@email.com',
  false,
  '2026-01-01T19:03:47.978Z'
);
INSERT INTO users (id, username, password, email, is_admin, created_at) VALUES (
  '72620ae1-2913-482c-ac70-05bd11e1683c',
  'jennifer_thomas',
  '156e8a15403471493ec0148f8426d2a4272c6b5e81bf4c87f586881b0f6a47d833418d982da5d2d8f19313d6bb6f0853e492528f6c3ee7ffafbb14a44025d91f.4d2e71d7c54e2499a58f8521541096a9',
  'jennifer.t@email.com',
  false,
  '2026-01-01T19:03:48.022Z'
);
INSERT INTO users (id, username, password, email, is_admin, created_at) VALUES (
  '181a3f9c-5962-4c22-8a95-2558456c6d02',
  'matthew_moore',
  '3e4a20ac75ef1dbcfe20cf08337a0f6b11789d17d8bd61fbe4048aab308df451bae0ec13e9a4780ef6e523d86cc4ca60eb5340f30c857e9c5b8ef92878cfd007.a89d1e25594b7cc4c8f487bdd866882f',
  'matthew.m@email.com',
  false,
  '2026-01-01T19:03:48.066Z'
);
INSERT INTO users (id, username, password, email, is_admin, created_at) VALUES (
  '84e4b40b-6b65-4318-abe4-510cf4279f3f',
  'ashley_jackson',
  '9337ec543eab7006440aed2833cb89513cbe52eb80450d3e6111e2f4fb75ab7db98d0594453c5449cb29b6a9c763e168a0e765d2f9f941b50204594ccebd51ac.0dea7be540c3f67b24cb930e6bc0a4b0',
  'ashley.j@email.com',
  false,
  '2026-01-01T19:03:48.107Z'
);
INSERT INTO users (id, username, password, email, is_admin, created_at) VALUES (
  '4694e230-b72f-4a4a-8651-247a116db44d',
  'daniel_harris',
  '3cdaf30949e69e5fa484549ec40df4c6310655b18970c7baf7db180c714e6ee9fffd1eeb0857c3ac1e2fc9624300f3d8a7271dcdeae98fa89bca75ac26978ffe.6d639b56b2ef6aac9969ab1ef1a04135',
  'daniel.h@email.com',
  false,
  '2026-01-01T19:03:48.150Z'
);
INSERT INTO users (id, username, password, email, is_admin, created_at) VALUES (
  '6fd20c1f-5262-47be-a48c-e4948afcd1cd',
  'lauren_clark',
  '62285f8851ac0d7902623a93565e03184a46bc4c04ff092e6e370d7d23b5ce629d1a218ca388981a51908a2bf7264d0428e82d1ffb48d746b547d10673408646.29d7aedf68722f543d28bafbaa5093f9',
  'lauren.c@email.com',
  false,
  '2026-01-01T19:03:48.193Z'
);
INSERT INTO users (id, username, password, email, is_admin, created_at) VALUES (
  'e920a2ea-2f1f-4bec-89ee-c906e68c69d3',
  'ryan_lewis',
  '6e7abb2807b57f1cb698d234d63d43185935d642cbb5154018650b587ffd05482d1c9ee7a4ed6dc8bb5e2516a9f11100d41712dc960f37c540b969d0eb6ee5b3.98642fa5aa2243ade3864e4a08b403b2',
  'ryan.l@email.com',
  false,
  '2026-01-01T19:03:48.237Z'
);
INSERT INTO users (id, username, password, email, is_admin, created_at) VALUES (
  '85554ac4-e91b-436b-9c75-7f87ffa3c47f',
  'nicole_walker',
  '03be42e8b662b8c0a71fc0b043050c828dfd2ada1a99047899b4781902d144a0545bf9b760c6057e99b7ecf73793ca5986083725d54664f1158256ef255e9709.6730a0bff735f1ee9520cb290b630401',
  'nicole.w@email.com',
  false,
  '2026-01-01T19:03:48.282Z'
);
INSERT INTO users (id, username, password, email, is_admin, created_at) VALUES (
  '29e962bd-a462-4fb9-9c29-17db7cf98032',
  'brandon_hall',
  'b185e536f6e8c002336586bb72b3df88418fd7deee0dd0d26263c5c2a4d1bdb86c44b28fc4ab4037e2b02e172a5e46e2852388427e2ca63329b58bd04c3f3f33.b781a4b81ba3babd6e54dbfb93f4e8e4',
  'brandon.h@email.com',
  false,
  '2026-01-01T19:03:48.325Z'
);

-- Products (108 rows)
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '5',
  'Hacker Hoodie - Black, Oversized, Anonymous',
  49.99,
  4.9,
  666,
  'https://images.unsplash.com/photo-1742548635624-02f0008b5027?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTEyMzJ8MHwxfHNlYXJjaHwxfHxibGFjayUyMGhvb2RpZSUyMGNsb3RoaW5nJTIwZmFzaGlvbnxlbnwwfDJ8fHwxNzY3MzExMTkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  true,
  'Fashion',
  'Essential attire for any main character in a cyber thriller.',
  '2026-01-01T17:36:06.613Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '6',
  'Mechanical Keyboard - Blue Switches, RGB Backlight',
  89.99,
  4.6,
  2311,
  'https://images.unsplash.com/photo-1656725035926-3ae2c5e3fbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTEyMzJ8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwa2V5Ym9hcmR8ZW58MHwyfHx8MTc2NzMxMTE5NXww&ixlib=rb-4.1.0&q=80&w=1080',
  true,
  'Electronics',
  'Click clack your way to victory. Your coworkers will love you.',
  '2026-01-01T17:36:06.614Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '7',
  'SQL Injection for Dummies - 2nd Edition',
  24.99,
  3.5,
  12,
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTEyMzJ8MHwxfHNlYXJjaHwxfHxib29rc3xlbnwwfDJ8fHwxNzY3MzExMTk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  false,
  'Books',
  'A classic. Learn how to drop tables like a pro.',
  '2026-01-01T17:36:06.616Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '8',
  'USB-C Hub Multiport Adapter - 7 in 1',
  35.00,
  4.3,
  899,
  'https://images.unsplash.com/photo-1633157546962-9bcc366ab21d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTEyMzJ8MHwxfHNlYXJjaHwxfHx1c2IlMjBodWIlMjBhZGFwdGVyJTIwdGVjaG5vbG9neXxlbnwwfDJ8fHwxNzY3MzExMjAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  true,
  'Electronics',
  'Because your laptop only has two ports for some reason.',
  '2026-01-01T17:36:06.617Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '1',
  'WHAM! Book Pro 16-inch - M3 Max, 36GB Unified Memory, 1TB SSD',
  2499.99,
  4.8,
  12453,
  'https://images.unsplash.com/photo-1662994545942-364b39dcb0cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTEyMzJ8MHwxfHNlYXJjaHwxfHxtYWNib29rJTIwcHJvJTIwbGFwdG9wfGVufDB8Mnx8fDE3NjczMTE5Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  true,
  'Electronics',
  'The most powerful WHAM! Book ever. Crushes standard CTF challenges with ease.',
  '2026-01-01T17:36:06.604Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '2',
  'SonicBass 5000 Noise Cancelling Headphones - Wireless Bluetooth',
  299.00,
  4.5,
  8902,
  'https://images.unsplash.com/photo-1614480909030-bda0898900a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTEyMzJ8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBhdWRpb3xlbnwwfDJ8fHwxNzY3MzExOTgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  true,
  'Electronics',
  'Silence the haters and focus on your hacking. 40 hours battery life.',
  '2026-01-01T17:36:06.609Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '3',
  'SpeedRunner X - Professional Marathon Running Shoes',
  129.95,
  4.2,
  342,
  'https://images.unsplash.com/photo-1600185652960-c9d8869d015c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTEyMzJ8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXMlMjBzbmVha2Vyc3xlbnwwfDJ8fHwxNzY3MzExOTg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  false,
  'Fashion',
  'Run away from security guards faster than ever before.',
  '2026-01-01T17:36:06.610Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '4',
  'SmartTime Elite - Fitness Tracker & Heart Rate Monitor',
  199.50,
  4.7,
  5671,
  'https://images.unsplash.com/photo-1697490057407-34c996cab84f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTEyMzJ8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNoJTIwZml0bmVzcyUyMHRyYWNrZXJ8ZW58MHwyfHx8MTc2NzMxMTk4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
  true,
  'Electronics',
  'Track your heart rate while deploying to production on a Friday.',
  '2026-01-01T17:36:06.612Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '9',
  'Wireless Mouse - Pro',
  149.99,
  5.0,
  1111,
  'https://placehold.co/600x600/2c3e50/ffffff?text=Electronics',
  false,
  'Electronics',
  'Compact and portable wireless mouse - pro perfect for on-the-go use. Take it anywhere.',
  '2026-01-01T19:03:23.810Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '10',
  'USB Cable - Lightning',
  79.99,
  3.8,
  791,
  'https://placehold.co/600x600/2c3e50/ffffff?text=Electronics',
  true,
  'Electronics',
  'Professional-grade usb cable - lightning built to last. Investment in quality and performance.',
  '2026-01-01T19:03:23.810Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '11',
  'Phone Case - Clear',
  29.99,
  4.0,
  1684,
  'https://placehold.co/600x600/2c3e50/ffffff?text=Electronics',
  true,
  'Electronics',
  'Compact and portable phone case - clear perfect for on-the-go use. Take it anywhere.',
  '2026-01-01T19:03:23.810Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '12',
  'Screen Protector - Blue Light',
  399.99,
  4.1,
  1166,
  'https://placehold.co/600x600/2c3e50/ffffff?text=Electronics',
  false,
  'Electronics',
  'Top-rated screen protector - blue light with excellent reviews. Trusted by thousands of satisfied customers.',
  '2026-01-01T19:03:23.810Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '13',
  'Power Bank - Compact',
  599.99,
  4.2,
  9151,
  'https://placehold.co/600x600/2c3e50/ffffff?text=Electronics',
  false,
  'Electronics',
  'Affordable power bank - compact without compromising on quality. Great value for money.',
  '2026-01-01T19:03:23.810Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '14',
  'Bluetooth Speaker - Portable',
  199.99,
  4.6,
  3669,
  'https://placehold.co/600x600/2c3e50/ffffff?text=Electronics',
  true,
  'Electronics',
  'Compact and portable bluetooth speaker - portable perfect for on-the-go use. Take it anywhere.',
  '2026-01-01T19:03:23.810Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '15',
  'Webcam - 4K',
  14.99,
  3.8,
  176,
  'https://placehold.co/600x600/2c3e50/ffffff?text=Electronics',
  false,
  'Electronics',
  'Innovative webcam - 4k featuring cutting-edge technology. Stay ahead with the latest features.',
  '2026-01-01T19:03:23.810Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '16',
  'Gaming Mouse Pad - Wireless Charging',
  499.99,
  4.8,
  1990,
  'https://placehold.co/600x600/2c3e50/ffffff?text=Electronics',
  false,
  'Electronics',
  'Affordable gaming mouse pad - wireless charging without compromising on quality. Great value for money.',
  '2026-01-01T19:03:23.810Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '17',
  'Wireless Mouse - Office',
  799.99,
  5.0,
  8901,
  'https://placehold.co/600x600/2c3e50/ffffff?text=Electronics',
  true,
  'Electronics',
  'Top-rated wireless mouse - office with excellent reviews. Trusted by thousands of satisfied customers.',
  '2026-01-01T19:03:23.810Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '18',
  'USB Cable - Fast Charge',
  79.99,
  3.5,
  4039,
  'https://placehold.co/600x600/2c3e50/ffffff?text=Electronics',
  false,
  'Electronics',
  'Innovative usb cable - fast charge featuring cutting-edge technology. Stay ahead with the latest features.',
  '2026-01-01T19:03:23.810Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '19',
  'Phone Case - Silicone',
  199.99,
  4.0,
  9321,
  'https://placehold.co/600x600/2c3e50/ffffff?text=Electronics',
  false,
  'Electronics',
  'Top-rated phone case - silicone with excellent reviews. Trusted by thousands of satisfied customers.',
  '2026-01-01T19:03:23.810Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '20',
  'Screen Protector - Privacy',
  14.99,
  3.8,
  4146,
  'https://placehold.co/600x600/2c3e50/ffffff?text=Electronics',
  false,
  'Electronics',
  'High-performance screen protector - privacy with advanced features. Perfect for professionals and enthusiasts.',
  '2026-01-01T19:03:23.810Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '21',
  'Power Bank - Solar',
  9.99,
  4.5,
  9890,
  'https://placehold.co/600x600/2c3e50/ffffff?text=Electronics',
  false,
  'Electronics',
  'Top-rated power bank - solar with excellent reviews. Trusted by thousands of satisfied customers.',
  '2026-01-01T19:03:23.810Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '22',
  'Bluetooth Speaker - Mini',
  399.99,
  4.6,
  392,
  'https://placehold.co/600x600/2c3e50/ffffff?text=Electronics',
  false,
  'Electronics',
  'Affordable bluetooth speaker - mini without compromising on quality. Great value for money.',
  '2026-01-01T19:03:23.810Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '23',
  'Webcam - Ring Light',
  79.99,
  5.0,
  506,
  'https://placehold.co/600x600/2c3e50/ffffff?text=Electronics',
  false,
  'Electronics',
  'Innovative webcam - ring light featuring cutting-edge technology. Stay ahead with the latest features.',
  '2026-01-01T19:03:23.810Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '24',
  'Gaming Mouse Pad - RGB',
  49.99,
  3.5,
  4122,
  'https://placehold.co/600x600/2c3e50/ffffff?text=Electronics',
  true,
  'Electronics',
  'Affordable gaming mouse pad - rgb without compromising on quality. Great value for money.',
  '2026-01-01T19:03:23.810Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '25',
  'Wireless Mouse - Elite',
  14.99,
  3.5,
  3511,
  'https://placehold.co/600x600/2c3e50/ffffff?text=Electronics',
  false,
  'Electronics',
  'Compact and portable wireless mouse - elite perfect for on-the-go use. Take it anywhere.',
  '2026-01-01T19:03:23.810Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '26',
  'USB Cable - Micro-USB',
  34.99,
  4.4,
  2064,
  'https://placehold.co/600x600/2c3e50/ffffff?text=Electronics',
  true,
  'Electronics',
  'Eco-friendly usb cable - micro-usb made with sustainable materials. Good for you and the planet.',
  '2026-01-01T19:03:23.810Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '27',
  'Phone Case - Rugged',
  199.99,
  4.9,
  1860,
  'https://placehold.co/600x600/2c3e50/ffffff?text=Electronics',
  false,
  'Electronics',
  'Premium quality phone case - rugged designed for everyday use. Features durable construction and modern design.',
  '2026-01-01T19:03:23.810Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '28',
  'Screen Protector - Matte',
  199.99,
  4.1,
  7526,
  'https://placehold.co/600x600/2c3e50/ffffff?text=Electronics',
  false,
  'Electronics',
  'Top-rated screen protector - matte with excellent reviews. Trusted by thousands of satisfied customers.',
  '2026-01-01T19:03:23.810Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '29',
  'SSD Drive - 256GB',
  89.99,
  3.8,
  5916,
  'https://placehold.co/600x600/3498db/ffffff?text=Computers',
  false,
  'Computers',
  'Eco-friendly ssd drive - 256gb made with sustainable materials. Good for you and the planet.',
  '2026-01-01T19:03:23.819Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '30',
  'RAM - 16GB DDR4',
  39.99,
  4.2,
  582,
  'https://placehold.co/600x600/3498db/ffffff?text=Computers',
  false,
  'Computers',
  'Compact and portable ram - 16gb ddr4 perfect for on-the-go use. Take it anywhere.',
  '2026-01-01T19:03:23.819Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '31',
  'Graphics Card - RTX 4080',
  39.99,
  3.5,
  5854,
  'https://placehold.co/600x600/3498db/ffffff?text=Computers',
  false,
  'Computers',
  'Innovative graphics card - rtx 4080 featuring cutting-edge technology. Stay ahead with the latest features.',
  '2026-01-01T19:03:23.819Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '32',
  'Monitor - Ultrawide',
  39.99,
  3.8,
  9367,
  'https://placehold.co/600x600/3498db/ffffff?text=Computers',
  false,
  'Computers',
  'Affordable monitor - ultrawide without compromising on quality. Great value for money.',
  '2026-01-01T19:03:23.819Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '33',
  'CPU Cooler - RGB',
  14.99,
  4.9,
  6941,
  'https://placehold.co/600x600/3498db/ffffff?text=Computers',
  true,
  'Computers',
  'Affordable cpu cooler - rgb without compromising on quality. Great value for money.',
  '2026-01-01T19:03:23.819Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '34',
  'Motherboard - B550',
  14.99,
  4.5,
  6410,
  'https://placehold.co/600x600/3498db/ffffff?text=Computers',
  false,
  'Computers',
  'Innovative motherboard - b550 featuring cutting-edge technology. Stay ahead with the latest features.',
  '2026-01-01T19:03:23.819Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '35',
  'PC Case - Full Tower',
  9.99,
  4.9,
  3372,
  'https://placehold.co/600x600/3498db/ffffff?text=Computers',
  true,
  'Computers',
  'Innovative pc case - full tower featuring cutting-edge technology. Stay ahead with the latest features.',
  '2026-01-01T19:03:23.819Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '36',
  'PSU - 850W Platinum',
  9.99,
  4.3,
  8631,
  'https://placehold.co/600x600/3498db/ffffff?text=Computers',
  false,
  'Computers',
  'Innovative psu - 850w platinum featuring cutting-edge technology. Stay ahead with the latest features.',
  '2026-01-01T19:03:23.819Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '37',
  'SSD Drive - 2TB',
  999.99,
  4.0,
  7715,
  'https://placehold.co/600x600/3498db/ffffff?text=Computers',
  false,
  'Computers',
  'Innovative ssd drive - 2tb featuring cutting-edge technology. Stay ahead with the latest features.',
  '2026-01-01T19:03:23.819Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '38',
  'RAM - 64GB DDR5',
  399.99,
  4.0,
  10059,
  'https://placehold.co/600x600/3498db/ffffff?text=Computers',
  true,
  'Computers',
  'Eco-friendly ram - 64gb ddr5 made with sustainable materials. Good for you and the planet.',
  '2026-01-01T19:03:23.819Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '39',
  'Graphics Card - RTX 4060',
  69.99,
  4.2,
  5258,
  'https://placehold.co/600x600/3498db/ffffff?text=Computers',
  true,
  'Computers',
  'Innovative graphics card - rtx 4060 featuring cutting-edge technology. Stay ahead with the latest features.',
  '2026-01-01T19:03:23.819Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '40',
  'Monitor - 27" 1440p',
  29.99,
  4.3,
  3628,
  'https://placehold.co/600x600/3498db/ffffff?text=Computers',
  true,
  'Computers',
  'Premium quality monitor - 27" 1440p designed for everyday use. Features durable construction and modern design.',
  '2026-01-01T19:03:23.819Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '41',
  'CPU Cooler - AIO 360mm',
  299.99,
  4.0,
  3142,
  'https://placehold.co/600x600/3498db/ffffff?text=Computers',
  false,
  'Computers',
  'Top-rated cpu cooler - aio 360mm with excellent reviews. Trusted by thousands of satisfied customers.',
  '2026-01-01T19:03:23.819Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '42',
  'Motherboard - Z790',
  199.99,
  3.8,
  5097,
  'https://placehold.co/600x600/3498db/ffffff?text=Computers',
  false,
  'Computers',
  'High-performance motherboard - z790 with advanced features. Perfect for professionals and enthusiasts.',
  '2026-01-01T19:03:23.819Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '43',
  'PC Case - Tempered Glass',
  29.99,
  5.0,
  4210,
  'https://placehold.co/600x600/3498db/ffffff?text=Computers',
  false,
  'Computers',
  'Premium quality pc case - tempered glass designed for everyday use. Features durable construction and modern design.',
  '2026-01-01T19:03:23.819Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '44',
  'PSU - 650W Bronze',
  599.99,
  4.3,
  8475,
  'https://placehold.co/600x600/3498db/ffffff?text=Computers',
  false,
  'Computers',
  'Affordable psu - 650w bronze without compromising on quality. Great value for money.',
  '2026-01-01T19:03:23.819Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '45',
  'SSD Drive - 512GB',
  79.99,
  4.2,
  9556,
  'https://placehold.co/600x600/3498db/ffffff?text=Computers',
  true,
  'Computers',
  'Eco-friendly ssd drive - 512gb made with sustainable materials. Good for you and the planet.',
  '2026-01-01T19:03:23.819Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '46',
  'RAM - 32GB DDR4',
  199.99,
  4.8,
  9053,
  'https://placehold.co/600x600/3498db/ffffff?text=Computers',
  false,
  'Computers',
  'Eco-friendly ram - 32gb ddr4 made with sustainable materials. Good for you and the planet.',
  '2026-01-01T19:03:23.819Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '47',
  'Graphics Card - RX 7800',
  59.99,
  4.6,
  4783,
  'https://placehold.co/600x600/3498db/ffffff?text=Computers',
  false,
  'Computers',
  'Affordable graphics card - rx 7800 without compromising on quality. Great value for money.',
  '2026-01-01T19:03:23.819Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '48',
  'Monitor - Curved Gaming',
  999.99,
  4.7,
  7801,
  'https://placehold.co/600x600/3498db/ffffff?text=Computers',
  false,
  'Computers',
  'Professional-grade monitor - curved gaming built to last. Investment in quality and performance.',
  '2026-01-01T19:03:23.819Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '49',
  'Programming Book: - Python Crash Course',
  199.99,
  4.4,
  8628,
  'https://placehold.co/600x600/e74c3c/ffffff?text=Books',
  false,
  'Books',
  'Innovative programming book: - python crash course featuring cutting-edge technology. Stay ahead with the latest features.',
  '2026-01-01T19:03:23.822Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '50',
  'Hacking Guide: - Network Penetration Testing',
  199.99,
  4.1,
  8381,
  'https://placehold.co/600x600/e74c3c/ffffff?text=Books',
  false,
  'Books',
  'Premium quality hacking guide: - network penetration testing designed for everyday use. Features durable construction and modern design.',
  '2026-01-01T19:03:23.822Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '51',
  'DevOps Manual: - Terraform Up & Running',
  999.99,
  3.5,
  1624,
  'https://placehold.co/600x600/e74c3c/ffffff?text=Books',
  false,
  'Books',
  'Innovative devops manual: - terraform up & running featuring cutting-edge technology. Stay ahead with the latest features.',
  '2026-01-01T19:03:23.822Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '52',
  'Database Guide: - Redis Essentials',
  399.99,
  4.3,
  1965,
  'https://placehold.co/600x600/e74c3c/ffffff?text=Books',
  false,
  'Books',
  'Affordable database guide: - redis essentials without compromising on quality. Great value for money.',
  '2026-01-01T19:03:23.822Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '53',
  'Tech Biography: - Alan Turing',
  59.99,
  4.4,
  9420,
  'https://placehold.co/600x600/e74c3c/ffffff?text=Books',
  false,
  'Books',
  'High-performance tech biography: - alan turing with advanced features. Perfect for professionals and enthusiasts.',
  '2026-01-01T19:03:23.822Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '54',
  'Programming Book: - Python Crash Course',
  59.99,
  4.0,
  1901,
  'https://placehold.co/600x600/e74c3c/ffffff?text=Books',
  false,
  'Books',
  'Premium quality programming book: - python crash course designed for everyday use. Features durable construction and modern design.',
  '2026-01-01T19:03:23.822Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '55',
  'Hacking Guide: - Network Penetration Testing',
  99.99,
  3.5,
  3924,
  'https://placehold.co/600x600/e74c3c/ffffff?text=Books',
  false,
  'Books',
  'Compact and portable hacking guide: - network penetration testing perfect for on-the-go use. Take it anywhere.',
  '2026-01-01T19:03:23.822Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '56',
  'DevOps Manual: - Terraform Up & Running',
  49.99,
  4.0,
  4157,
  'https://placehold.co/600x600/e74c3c/ffffff?text=Books',
  true,
  'Books',
  'Premium quality devops manual: - terraform up & running designed for everyday use. Features durable construction and modern design.',
  '2026-01-01T19:03:23.822Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '57',
  'Database Guide: - Redis Essentials',
  499.99,
  4.5,
  4322,
  'https://placehold.co/600x600/e74c3c/ffffff?text=Books',
  true,
  'Books',
  'Affordable database guide: - redis essentials without compromising on quality. Great value for money.',
  '2026-01-01T19:03:23.822Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '58',
  'Tech Biography: - Alan Turing',
  59.99,
  4.6,
  9007,
  'https://placehold.co/600x600/e74c3c/ffffff?text=Books',
  false,
  'Books',
  'Innovative tech biography: - alan turing featuring cutting-edge technology. Stay ahead with the latest features.',
  '2026-01-01T19:03:23.822Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '59',
  'Programming Book: - Python Crash Course',
  149.99,
  4.7,
  4770,
  'https://placehold.co/600x600/e74c3c/ffffff?text=Books',
  false,
  'Books',
  'Top-rated programming book: - python crash course with excellent reviews. Trusted by thousands of satisfied customers.',
  '2026-01-01T19:03:23.822Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '60',
  'Hacking Guide: - Network Penetration Testing',
  89.99,
  4.5,
  9418,
  'https://placehold.co/600x600/e74c3c/ffffff?text=Books',
  false,
  'Books',
  'Innovative hacking guide: - network penetration testing featuring cutting-edge technology. Stay ahead with the latest features.',
  '2026-01-01T19:03:23.822Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '61',
  'DevOps Manual: - Terraform Up & Running',
  9.99,
  4.3,
  1702,
  'https://placehold.co/600x600/e74c3c/ffffff?text=Books',
  true,
  'Books',
  'Professional-grade devops manual: - terraform up & running built to last. Investment in quality and performance.',
  '2026-01-01T19:03:23.822Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '62',
  'Database Guide: - Redis Essentials',
  999.99,
  4.5,
  4275,
  'https://placehold.co/600x600/e74c3c/ffffff?text=Books',
  false,
  'Books',
  'Premium quality database guide: - redis essentials designed for everyday use. Features durable construction and modern design.',
  '2026-01-01T19:03:23.822Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '63',
  'Tech Biography: - Alan Turing',
  149.99,
  4.3,
  4813,
  'https://placehold.co/600x600/e74c3c/ffffff?text=Books',
  false,
  'Books',
  'Compact and portable tech biography: - alan turing perfect for on-the-go use. Take it anywhere.',
  '2026-01-01T19:03:23.822Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '64',
  'Programming Book: - Python Crash Course',
  199.99,
  4.2,
  6449,
  'https://placehold.co/600x600/e74c3c/ffffff?text=Books',
  false,
  'Books',
  'Premium quality programming book: - python crash course designed for everyday use. Features durable construction and modern design.',
  '2026-01-01T19:03:23.822Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '65',
  'Hacking Guide: - Network Penetration Testing',
  599.99,
  4.8,
  405,
  'https://placehold.co/600x600/e74c3c/ffffff?text=Books',
  false,
  'Books',
  'Innovative hacking guide: - network penetration testing featuring cutting-edge technology. Stay ahead with the latest features.',
  '2026-01-01T19:03:23.822Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '66',
  'DevOps Manual: - Terraform Up & Running',
  199.99,
  4.9,
  4378,
  'https://placehold.co/600x600/e74c3c/ffffff?text=Books',
  false,
  'Books',
  'Professional-grade devops manual: - terraform up & running built to last. Investment in quality and performance.',
  '2026-01-01T19:03:23.822Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '67',
  'Database Guide: - Redis Essentials',
  69.99,
  3.5,
  8971,
  'https://placehold.co/600x600/e74c3c/ffffff?text=Books',
  true,
  'Books',
  'Premium quality database guide: - redis essentials designed for everyday use. Features durable construction and modern design.',
  '2026-01-01T19:03:23.822Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '68',
  'Tech Biography: - Alan Turing',
  399.99,
  4.7,
  5793,
  'https://placehold.co/600x600/e74c3c/ffffff?text=Books',
  false,
  'Books',
  'Eco-friendly tech biography: - alan turing made with sustainable materials. Good for you and the planet.',
  '2026-01-01T19:03:23.822Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '69',
  'T-Shirt - Graphic Tee',
  149.99,
  4.1,
  3298,
  'https://placehold.co/600x600/9b59b6/ffffff?text=Clothing',
  true,
  'Clothing',
  'Professional-grade t-shirt - graphic tee built to last. Investment in quality and performance.',
  '2026-01-01T19:03:23.825Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '70',
  'Hoodie - Pullover',
  9.99,
  4.5,
  5246,
  'https://placehold.co/600x600/9b59b6/ffffff?text=Clothing',
  false,
  'Clothing',
  'Premium quality hoodie - pullover designed for everyday use. Features durable construction and modern design.',
  '2026-01-01T19:03:23.825Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '71',
  'Jeans - Bootcut',
  149.99,
  4.5,
  2634,
  'https://placehold.co/600x600/9b59b6/ffffff?text=Clothing',
  false,
  'Clothing',
  'Professional-grade jeans - bootcut built to last. Investment in quality and performance.',
  '2026-01-01T19:03:23.825Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '72',
  'Sneakers - Skate',
  29.99,
  3.8,
  6502,
  'https://placehold.co/600x600/9b59b6/ffffff?text=Clothing',
  false,
  'Clothing',
  'High-performance sneakers - skate with advanced features. Perfect for professionals and enthusiasts.',
  '2026-01-01T19:03:23.825Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '73',
  'Hat - Trucker',
  99.99,
  4.9,
  2209,
  'https://placehold.co/600x600/9b59b6/ffffff?text=Clothing',
  false,
  'Clothing',
  'Professional-grade hat - trucker built to last. Investment in quality and performance.',
  '2026-01-01T19:03:23.825Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '74',
  'Jacket - Bomber',
  9.99,
  3.5,
  1793,
  'https://placehold.co/600x600/9b59b6/ffffff?text=Clothing',
  false,
  'Clothing',
  'Affordable jacket - bomber without compromising on quality. Great value for money.',
  '2026-01-01T19:03:23.825Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '75',
  'T-Shirt - V-Neck',
  799.99,
  4.4,
  10073,
  'https://placehold.co/600x600/9b59b6/ffffff?text=Clothing',
  false,
  'Clothing',
  'High-performance t-shirt - v-neck with advanced features. Perfect for professionals and enthusiasts.',
  '2026-01-01T19:03:23.825Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '76',
  'Hoodie - Tech Fleece',
  69.99,
  4.2,
  7490,
  'https://placehold.co/600x600/9b59b6/ffffff?text=Clothing',
  false,
  'Clothing',
  'Premium quality hoodie - tech fleece designed for everyday use. Features durable construction and modern design.',
  '2026-01-01T19:03:23.825Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '77',
  'Jeans - Distressed',
  199.99,
  4.3,
  7296,
  'https://placehold.co/600x600/9b59b6/ffffff?text=Clothing',
  true,
  'Clothing',
  'Compact and portable jeans - distressed perfect for on-the-go use. Take it anywhere.',
  '2026-01-01T19:03:23.825Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '78',
  'Sneakers - High-Top',
  19.99,
  3.5,
  2559,
  'https://placehold.co/600x600/9b59b6/ffffff?text=Clothing',
  false,
  'Clothing',
  'Top-rated sneakers - high-top with excellent reviews. Trusted by thousands of satisfied customers.',
  '2026-01-01T19:03:23.825Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '79',
  'Hat - Baseball Cap',
  69.99,
  4.5,
  7343,
  'https://placehold.co/600x600/9b59b6/ffffff?text=Clothing',
  true,
  'Clothing',
  'Affordable hat - baseball cap without compromising on quality. Great value for money.',
  '2026-01-01T19:03:23.825Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '80',
  'Jacket - Denim',
  89.99,
  4.5,
  4417,
  'https://placehold.co/600x600/9b59b6/ffffff?text=Clothing',
  false,
  'Clothing',
  'Professional-grade jacket - denim built to last. Investment in quality and performance.',
  '2026-01-01T19:03:23.825Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '81',
  'T-Shirt - Plain Black',
  79.99,
  4.3,
  5054,
  'https://placehold.co/600x600/9b59b6/ffffff?text=Clothing',
  false,
  'Clothing',
  'Affordable t-shirt - plain black without compromising on quality. Great value for money.',
  '2026-01-01T19:03:23.825Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '82',
  'Hoodie - Oversized',
  39.99,
  4.0,
  5200,
  'https://placehold.co/600x600/9b59b6/ffffff?text=Clothing',
  false,
  'Clothing',
  'Top-rated hoodie - oversized with excellent reviews. Trusted by thousands of satisfied customers.',
  '2026-01-01T19:03:23.825Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '83',
  'Jeans - High Waisted',
  89.99,
  4.0,
  2501,
  'https://placehold.co/600x600/9b59b6/ffffff?text=Clothing',
  true,
  'Clothing',
  'Innovative jeans - high waisted featuring cutting-edge technology. Stay ahead with the latest features.',
  '2026-01-01T19:03:23.825Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '84',
  'Sneakers - Running',
  999.99,
  4.8,
  2602,
  'https://placehold.co/600x600/9b59b6/ffffff?text=Clothing',
  false,
  'Clothing',
  'Premium quality sneakers - running designed for everyday use. Features durable construction and modern design.',
  '2026-01-01T19:03:23.825Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '85',
  'Hat - Beanie',
  299.99,
  4.5,
  7437,
  'https://placehold.co/600x600/9b59b6/ffffff?text=Clothing',
  true,
  'Clothing',
  'Top-rated hat - beanie with excellent reviews. Trusted by thousands of satisfied customers.',
  '2026-01-01T19:03:23.825Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '86',
  'Jacket - Leather',
  799.99,
  4.5,
  3618,
  'https://placehold.co/600x600/9b59b6/ffffff?text=Clothing',
  false,
  'Clothing',
  'Top-rated jacket - leather with excellent reviews. Trusted by thousands of satisfied customers.',
  '2026-01-01T19:03:23.825Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '87',
  'T-Shirt - Vintage Wash',
  59.99,
  5.0,
  4452,
  'https://placehold.co/600x600/9b59b6/ffffff?text=Clothing',
  false,
  'Clothing',
  'Compact and portable t-shirt - vintage wash perfect for on-the-go use. Take it anywhere.',
  '2026-01-01T19:03:23.825Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '88',
  'Hoodie - Cropped',
  19.99,
  4.5,
  1460,
  'https://placehold.co/600x600/9b59b6/ffffff?text=Clothing',
  false,
  'Clothing',
  'Innovative hoodie - cropped featuring cutting-edge technology. Stay ahead with the latest features.',
  '2026-01-01T19:03:23.825Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '89',
  'Desk Lamp - LED',
  39.99,
  4.2,
  7292,
  'https://placehold.co/600x600/27ae60/ffffff?text=Home',
  false,
  'Home',
  'Professional-grade desk lamp - led built to last. Investment in quality and performance.',
  '2026-01-01T19:03:23.830Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '90',
  'Office Chair - Gaming',
  14.99,
  4.4,
  6126,
  'https://placehold.co/600x600/27ae60/ffffff?text=Home',
  false,
  'Home',
  'Compact and portable office chair - gaming perfect for on-the-go use. Take it anywhere.',
  '2026-01-01T19:03:23.830Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '91',
  'Desk Organizer - Drawer',
  39.99,
  5.0,
  2832,
  'https://placehold.co/600x600/27ae60/ffffff?text=Home',
  true,
  'Home',
  'Innovative desk organizer - drawer featuring cutting-edge technology. Stay ahead with the latest features.',
  '2026-01-01T19:03:23.830Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '92',
  'Desk - Glass Top',
  59.99,
  4.9,
  5571,
  'https://placehold.co/600x600/27ae60/ffffff?text=Home',
  false,
  'Home',
  'Affordable desk - glass top without compromising on quality. Great value for money.',
  '2026-01-01T19:03:23.830Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '93',
  'Storage Box - Clear Lid',
  89.99,
  3.5,
  6138,
  'https://placehold.co/600x600/27ae60/ffffff?text=Home',
  true,
  'Home',
  'Top-rated storage box - clear lid with excellent reviews. Trusted by thousands of satisfied customers.',
  '2026-01-01T19:03:23.830Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '94',
  'Wall Art - Canvas Print',
  299.99,
  3.8,
  9337,
  'https://placehold.co/600x600/27ae60/ffffff?text=Home',
  false,
  'Home',
  'Innovative wall art - canvas print featuring cutting-edge technology. Stay ahead with the latest features.',
  '2026-01-01T19:03:23.830Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '95',
  'Desk Lamp - Adjustable Arm',
  499.99,
  3.5,
  7144,
  'https://placehold.co/600x600/27ae60/ffffff?text=Home',
  false,
  'Home',
  'Premium quality desk lamp - adjustable arm designed for everyday use. Features durable construction and modern design.',
  '2026-01-01T19:03:23.830Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '96',
  'Office Chair - Executive',
  19.99,
  4.4,
  7224,
  'https://placehold.co/600x600/27ae60/ffffff?text=Home',
  false,
  'Home',
  'High-performance office chair - executive with advanced features. Perfect for professionals and enthusiasts.',
  '2026-01-01T19:03:23.830Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '97',
  'Desk Organizer - Monitor Stand',
  49.99,
  3.5,
  7540,
  'https://placehold.co/600x600/27ae60/ffffff?text=Home',
  false,
  'Home',
  'Compact and portable desk organizer - monitor stand perfect for on-the-go use. Take it anywhere.',
  '2026-01-01T19:03:23.830Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '98',
  'Desk - Compact',
  499.99,
  4.4,
  3754,
  'https://placehold.co/600x600/27ae60/ffffff?text=Home',
  false,
  'Home',
  'Premium quality desk - compact designed for everyday use. Features durable construction and modern design.',
  '2026-01-01T19:03:23.830Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '99',
  'Storage Box - Plastic Bins',
  299.99,
  4.1,
  6653,
  'https://placehold.co/600x600/27ae60/ffffff?text=Home',
  false,
  'Home',
  'Affordable storage box - plastic bins without compromising on quality. Great value for money.',
  '2026-01-01T19:03:23.830Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '100',
  'Wall Art - Metal Sign',
  799.99,
  4.5,
  9803,
  'https://placehold.co/600x600/27ae60/ffffff?text=Home',
  true,
  'Home',
  'Eco-friendly wall art - metal sign made with sustainable materials. Good for you and the planet.',
  '2026-01-01T19:03:23.830Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '101',
  'Desk Lamp - Wireless Charging',
  89.99,
  4.9,
  2439,
  'https://placehold.co/600x600/27ae60/ffffff?text=Home',
  false,
  'Home',
  'Eco-friendly desk lamp - wireless charging made with sustainable materials. Good for you and the planet.',
  '2026-01-01T19:03:23.830Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '102',
  'Office Chair - Mesh Back',
  9.99,
  4.3,
  5466,
  'https://placehold.co/600x600/27ae60/ffffff?text=Home',
  false,
  'Home',
  'Eco-friendly office chair - mesh back made with sustainable materials. Good for you and the planet.',
  '2026-01-01T19:03:23.830Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '103',
  'Desk Organizer - Cable Management',
  399.99,
  4.9,
  1442,
  'https://placehold.co/600x600/27ae60/ffffff?text=Home',
  true,
  'Home',
  'Top-rated desk organizer - cable management with excellent reviews. Trusted by thousands of satisfied customers.',
  '2026-01-01T19:03:23.830Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '104',
  'Desk - Standing',
  9.99,
  4.5,
  2635,
  'https://placehold.co/600x600/27ae60/ffffff?text=Home',
  false,
  'Home',
  'Premium quality desk - standing designed for everyday use. Features durable construction and modern design.',
  '2026-01-01T19:03:23.830Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '105',
  'Storage Box - Fabric Cubes',
  39.99,
  4.1,
  1613,
  'https://placehold.co/600x600/27ae60/ffffff?text=Home',
  false,
  'Home',
  'Innovative storage box - fabric cubes featuring cutting-edge technology. Stay ahead with the latest features.',
  '2026-01-01T19:03:23.830Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '106',
  'Wall Art - Neon Light',
  599.99,
  4.3,
  895,
  'https://placehold.co/600x600/27ae60/ffffff?text=Home',
  false,
  'Home',
  'Innovative wall art - neon light featuring cutting-edge technology. Stay ahead with the latest features.',
  '2026-01-01T19:03:23.830Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '107',
  'Desk Lamp - RGB',
  19.99,
  3.5,
  2386,
  'https://placehold.co/600x600/27ae60/ffffff?text=Home',
  false,
  'Home',
  'Professional-grade desk lamp - rgb built to last. Investment in quality and performance.',
  '2026-01-01T19:03:23.830Z'
);
INSERT INTO products (id, title, price, rating, reviews, image, is_wham, category, description, created_at) VALUES (
  '108',
  'Office Chair - Kneeling',
  29.99,
  4.5,
  3112,
  'https://placehold.co/600x600/27ae60/ffffff?text=Home',
  false,
  'Home',
  'Innovative office chair - kneeling featuring cutting-edge technology. Stay ahead with the latest features.',
  '2026-01-01T19:03:23.830Z'
);

-- Orders (2 rows)
INSERT INTO orders (id, user_id, total, status, shipping_address, created_at) VALUES (
  '7902474a-996d-4c43-acf2-eec604178410',
  '71d5535c-bdeb-4430-9bb9-a540b8310e3a',
  4999.98,
  'pending',
  'John Doe, 123 Main St, New York, NY 10001, USA',
  '2026-01-01T18:26:46.720Z'
);
INSERT INTO orders (id, user_id, total, status, shipping_address, created_at) VALUES (
  '7e2476be-cbcd-45b4-87a9-fbf9f7a4ba6b',
  '5cc83faf-e037-4da6-b10b-1836742e20f6',
  2499.99,
  'pending',
  'Test Address',
  '2026-01-01T18:29:59.751Z'
);

-- Order Items (2 rows)
INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (
  '79f7b9d0-e9ad-4793-af2f-1e1bcc941080',
  '7902474a-996d-4c43-acf2-eec604178410',
  '1',
  2,
  2499.99
);
INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES (
  '404e94f7-5faf-4370-ae51-aaea0a8ddda4',
  '7e2476be-cbcd-45b4-87a9-fbf9f7a4ba6b',
  '1',
  1,
  2499.99
);

-- Reset sequences
SELECT setval(pg_get_serial_sequence('users', 'id'), (SELECT MAX(CAST(id AS INTEGER)) FROM users WHERE id ~ '^[0-9]+$'), true);
SELECT setval(pg_get_serial_sequence('products', 'id'), (SELECT MAX(CAST(id AS INTEGER)) FROM products WHERE id ~ '^[0-9]+$'), true);
