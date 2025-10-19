-- CreateTable
CREATE TABLE `product_imports` (
    `importId` INTEGER NOT NULL AUTO_INCREMENT,
    `invoiceNumber` VARCHAR(191) NOT NULL,
    `totalCost` DOUBLE NOT NULL,
    `importDate` DATETIME(3) NOT NULL,
    `trackedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `trackedBy` INTEGER NOT NULL,

    INDEX `product_imports_invoiceNumber_idx`(`invoiceNumber`),
    PRIMARY KEY (`importId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `import_items` (
    `importId` INTEGER NOT NULL,
    `productItemId` INTEGER NOT NULL,
    `cost` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`importId`, `productItemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventory_damage_reports` (
    `reportId` INTEGER NOT NULL AUTO_INCREMENT,
    `totalExpectedCost` DOUBLE NOT NULL,
    `reason` ENUM('lost', 'broken', 'defective', 'other') NOT NULL,
    `note` VARCHAR(191) NULL,
    `reportedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `reportedBy` INTEGER NOT NULL,

    PRIMARY KEY (`reportId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `damage_report_items` (
    `reportId` INTEGER NOT NULL,
    `productItemId` INTEGER NOT NULL,
    `expectedCost` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`reportId`, `productItemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `orderId` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `couponId` INTEGER NULL,
    `status` ENUM('pending', 'accepted', 'packed', 'dispatched', 'delivery_success', 'delivery_failed', 'cancelled', 'returned') NOT NULL DEFAULT 'pending',
    `totalAmount` DOUBLE NOT NULL,
    `recipientName` VARCHAR(191) NULL,
    `deliveryPhone` VARCHAR(191) NULL,
    `deliveryAddress` VARCHAR(191) NULL,
    `note` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deliveredAt` DATETIME(3) NULL,
    `refundedAt` DATETIME(3) NULL,

    PRIMARY KEY (`orderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_items` (
    `orderId` INTEGER NOT NULL,
    `productItemId` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`orderId`, `productItemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_status_update_logs` (
    `logId` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `status` ENUM('pending', 'accepted', 'packed', 'dispatched', 'delivery_success', 'delivery_failed', 'cancelled', 'returned') NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedBy` INTEGER NOT NULL,

    PRIMARY KEY (`logId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `root_products` (
    `rootProductId` INTEGER NOT NULL AUTO_INCREMENT,
    `brandId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `price` DOUBLE NOT NULL,
    `isAccessory` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` INTEGER NOT NULL,

    UNIQUE INDEX `root_products_name_key`(`name`),
    UNIQUE INDEX `root_products_slug_key`(`slug`),
    INDEX `root_products_name_slug_idx`(`name`, `slug`),
    PRIMARY KEY (`rootProductId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_items` (
    `productItemId` INTEGER NOT NULL AUTO_INCREMENT,
    `rootProductId` INTEGER NOT NULL,
    `size` VARCHAR(191) NOT NULL DEFAULT 'Mặc định',
    `stock` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `product_items_rootProductId_size_key`(`rootProductId`, `size`),
    PRIMARY KEY (`productItemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_images` (
    `imageId` INTEGER NOT NULL AUTO_INCREMENT,
    `rootProductId` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `product_images_rootProductId_url_key`(`rootProductId`, `url`),
    PRIMARY KEY (`imageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_brands` (
    `brandId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `logoUrl` VARCHAR(191) NULL,

    INDEX `product_brands_name_idx`(`name`),
    PRIMARY KEY (`brandId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shoe_features` (
    `shoeFeatureId` INTEGER NOT NULL AUTO_INCREMENT,
    `rootProductId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `gender` ENUM('male', 'female', 'unisex') NOT NULL DEFAULT 'unisex',
    `upperMaterial` VARCHAR(191) NOT NULL,
    `soleMaterial` VARCHAR(191) NOT NULL,
    `liningMaterial` VARCHAR(191) NOT NULL,
    `closureType` VARCHAR(191) NOT NULL,
    `toeShape` VARCHAR(191) NOT NULL,
    `waterResistant` VARCHAR(191) NOT NULL,
    `breathability` VARCHAR(191) NOT NULL,
    `pattern` VARCHAR(191) NOT NULL,
    `countryOfOrigin` VARCHAR(191) NOT NULL,
    `primaryColor` VARCHAR(191) NOT NULL,
    `secondaryColor` VARCHAR(191) NULL,
    `heelHeight` DOUBLE NOT NULL,
    `durabilityRating` DOUBLE NOT NULL,
    `releaseYear` INTEGER NOT NULL,

    UNIQUE INDEX `shoe_features_rootProductId_key`(`rootProductId`),
    PRIMARY KEY (`shoeFeatureId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `occasion_tags` (
    `occasionTagId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `occasion_tags_name_key`(`name`),
    PRIMARY KEY (`occasionTagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shoe_feature_occasion_tag` (
    `shoeFeatureId` INTEGER NOT NULL,
    `occasionTagId` INTEGER NOT NULL,

    PRIMARY KEY (`shoeFeatureId`, `occasionTagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `design_tags` (
    `designTagId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `design_tags_name_key`(`name`),
    PRIMARY KEY (`designTagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shoe_feature_design_tag` (
    `shoeFeatureId` INTEGER NOT NULL,
    `designTagId` INTEGER NOT NULL,

    PRIMARY KEY (`shoeFeatureId`, `designTagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shoe_categories` (
    `categoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` INTEGER NOT NULL,

    UNIQUE INDEX `shoe_categories_name_key`(`name`),
    INDEX `shoe_categories_name_idx`(`name`),
    PRIMARY KEY (`categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `promotions` (
    `promotionId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `discountRate` DOUBLE NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` INTEGER NOT NULL,

    UNIQUE INDEX `promotions_name_key`(`name`),
    PRIMARY KEY (`promotionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `promotion_product` (
    `promotionId` INTEGER NOT NULL,
    `rootProductId` INTEGER NOT NULL,

    PRIMARY KEY (`promotionId`, `rootProductId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coupons` (
    `couponId` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `type` ENUM('fixed', 'percentage') NOT NULL DEFAULT 'fixed',
    `amount` DOUBLE NOT NULL,
    `maxUsage` INTEGER NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `expiredAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` INTEGER NOT NULL,

    UNIQUE INDEX `coupons_code_key`(`code`),
    PRIMARY KEY (`couponId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounts` (
    `accountId` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`accountId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customers` (
    `customerId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `accountId` INTEGER NOT NULL,

    UNIQUE INDEX `customers_accountId_key`(`accountId`),
    INDEX `customers_email_idx`(`email`),
    PRIMARY KEY (`customerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `staffs` (
    `staffId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `accountId` INTEGER NOT NULL,
    `roleId` INTEGER NOT NULL,
    `createdBy` INTEGER NULL,

    UNIQUE INDEX `staffs_accountId_key`(`accountId`),
    PRIMARY KEY (`staffId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `staff_roles` (
    `roleId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `isImmutable` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `staff_roles_name_key`(`name`),
    PRIMARY KEY (`roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_permissions` (
    `permissionId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `app_permissions_name_key`(`name`),
    UNIQUE INDEX `app_permissions_code_key`(`code`),
    PRIMARY KEY (`permissionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_permission` (
    `roleId` INTEGER NOT NULL,
    `permissionId` INTEGER NOT NULL,

    PRIMARY KEY (`roleId`, `permissionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer_addresses` (
    `addressId` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `recipientName` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `ward` VARCHAR(191) NOT NULL,
    `addressLine` VARCHAR(191) NOT NULL,
    `isDefault` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer_carts` (
    `cartId` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `status` ENUM('active', 'converted', 'abandoned') NOT NULL DEFAULT 'active',
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`cartId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart_items` (
    `cartId` INTEGER NOT NULL,
    `productItemId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`cartId`, `productItemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conversations` (
    `conversationId` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,

    UNIQUE INDEX `conversations_customerId_key`(`customerId`),
    PRIMARY KEY (`conversationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chat_messages` (
    `messageId` INTEGER NOT NULL AUTO_INCREMENT,
    `conversationId` INTEGER NOT NULL,
    `senderStaffId` INTEGER NULL,
    `textContent` TEXT NULL,
    `imageContent` VARCHAR(191) NULL,
    `sentAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`messageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product_imports` ADD CONSTRAINT `product_imports_trackedBy_fkey` FOREIGN KEY (`trackedBy`) REFERENCES `staffs`(`staffId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `import_items` ADD CONSTRAINT `import_items_importId_fkey` FOREIGN KEY (`importId`) REFERENCES `product_imports`(`importId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `import_items` ADD CONSTRAINT `import_items_productItemId_fkey` FOREIGN KEY (`productItemId`) REFERENCES `product_items`(`productItemId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventory_damage_reports` ADD CONSTRAINT `inventory_damage_reports_reportedBy_fkey` FOREIGN KEY (`reportedBy`) REFERENCES `staffs`(`staffId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `damage_report_items` ADD CONSTRAINT `damage_report_items_reportId_fkey` FOREIGN KEY (`reportId`) REFERENCES `inventory_damage_reports`(`reportId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `damage_report_items` ADD CONSTRAINT `damage_report_items_productItemId_fkey` FOREIGN KEY (`productItemId`) REFERENCES `product_items`(`productItemId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`customerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_couponId_fkey` FOREIGN KEY (`couponId`) REFERENCES `coupons`(`couponId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_productItemId_fkey` FOREIGN KEY (`productItemId`) REFERENCES `product_items`(`productItemId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_status_update_logs` ADD CONSTRAINT `order_status_update_logs_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_status_update_logs` ADD CONSTRAINT `order_status_update_logs_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `staffs`(`staffId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `root_products` ADD CONSTRAINT `root_products_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `product_brands`(`brandId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `root_products` ADD CONSTRAINT `root_products_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `staffs`(`staffId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_items` ADD CONSTRAINT `product_items_rootProductId_fkey` FOREIGN KEY (`rootProductId`) REFERENCES `root_products`(`rootProductId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_images` ADD CONSTRAINT `product_images_rootProductId_fkey` FOREIGN KEY (`rootProductId`) REFERENCES `root_products`(`rootProductId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shoe_features` ADD CONSTRAINT `shoe_features_rootProductId_fkey` FOREIGN KEY (`rootProductId`) REFERENCES `root_products`(`rootProductId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shoe_features` ADD CONSTRAINT `shoe_features_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `shoe_categories`(`categoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shoe_feature_occasion_tag` ADD CONSTRAINT `shoe_feature_occasion_tag_shoeFeatureId_fkey` FOREIGN KEY (`shoeFeatureId`) REFERENCES `shoe_features`(`shoeFeatureId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shoe_feature_occasion_tag` ADD CONSTRAINT `shoe_feature_occasion_tag_occasionTagId_fkey` FOREIGN KEY (`occasionTagId`) REFERENCES `occasion_tags`(`occasionTagId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shoe_feature_design_tag` ADD CONSTRAINT `shoe_feature_design_tag_shoeFeatureId_fkey` FOREIGN KEY (`shoeFeatureId`) REFERENCES `shoe_features`(`shoeFeatureId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shoe_feature_design_tag` ADD CONSTRAINT `shoe_feature_design_tag_designTagId_fkey` FOREIGN KEY (`designTagId`) REFERENCES `design_tags`(`designTagId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shoe_categories` ADD CONSTRAINT `shoe_categories_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `staffs`(`staffId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `promotions` ADD CONSTRAINT `promotions_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `staffs`(`staffId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `promotion_product` ADD CONSTRAINT `promotion_product_promotionId_fkey` FOREIGN KEY (`promotionId`) REFERENCES `promotions`(`promotionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `promotion_product` ADD CONSTRAINT `promotion_product_rootProductId_fkey` FOREIGN KEY (`rootProductId`) REFERENCES `root_products`(`rootProductId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `coupons` ADD CONSTRAINT `coupons_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `staffs`(`staffId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customers` ADD CONSTRAINT `customers_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `accounts`(`accountId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `staffs` ADD CONSTRAINT `staffs_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `accounts`(`accountId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `staffs` ADD CONSTRAINT `staffs_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `staff_roles`(`roleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `staffs` ADD CONSTRAINT `staffs_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `staffs`(`staffId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_permission` ADD CONSTRAINT `role_permission_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `staff_roles`(`roleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_permission` ADD CONSTRAINT `role_permission_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `app_permissions`(`permissionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customer_addresses` ADD CONSTRAINT `customer_addresses_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`customerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customer_carts` ADD CONSTRAINT `customer_carts_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`customerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `customer_carts`(`cartId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_productItemId_fkey` FOREIGN KEY (`productItemId`) REFERENCES `product_items`(`productItemId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conversations` ADD CONSTRAINT `conversations_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`customerId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chat_messages` ADD CONSTRAINT `chat_messages_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `conversations`(`conversationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chat_messages` ADD CONSTRAINT `chat_messages_senderStaffId_fkey` FOREIGN KEY (`senderStaffId`) REFERENCES `staffs`(`staffId`) ON DELETE SET NULL ON UPDATE CASCADE;
