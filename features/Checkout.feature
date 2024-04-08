Feature: Checkout and Placing an Order including verification of Order in Order Details Page


    Scenario: Place an Order and verify the order
        Given Customer login to the account using "test.user8@test.com" and "Test@1234"
        When add product "ADIDAS ORIGINAL1" to cart
        Then product "ADIDAS ORIGINAL" is added to cart
        When customer enters checkout details and place an Order
        Then order is placed and present in customer account

