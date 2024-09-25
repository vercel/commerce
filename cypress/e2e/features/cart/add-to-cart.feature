Feature: Add product to cart
    As a customer
    I want to add products to my shopping cart
    So that I can purchase them later

    Scenario: Add a product to the cart from the product page
        Given I am on the product detail page for "<product-name>"
        When I select "<color>" color of "<product-name>"
        And  I click "Add to Cart"
        Then the product should be added to my shopping cart

    Examples:
    | color    | product-name         |
    | Ice      |The Complete Snowboard|
    | Dawn     |The Complete Snowboard|
    | Powder   |The Complete Snowboard|
    | Electric |The Complete Snowboard|
    | Sunset   |The Complete Snowboard|


    Scenario: Check that the cart total updates after adding a product
        Given I am on the product detail page for "<product-name>"
        When I click "Add to Cart"
        And the "<product-name>" costs "<amount>" "<code-currency>"
        Then the total in the shopping cart should be updated to "<amount>" "<code-currency>"

    Examples:
    | product-name                    | amount    | code-currency |
    | The Compare at Price Snowboard  |785,95     | EUR           |

    Scenario: Cannot add a product to the cart without selecting a required option
        Given I am on the product detail page for "<product-name>"
        When I do not select a color
        Then I Can not add the product in the shopping cart

    Examples:
    |     product-name     |
    |The Complete Snowboard|

    Scenario: Add a product to the cart that is out of stock
        Given I am on the product detail page for "<product-name>"
        And the "<product-name>" is out of stock
        When I click "Add to Cart"
        Then the product should not be added to my shopping cart
        And "Add to Cart" button should have the name "Out Of Stock"
    Examples:
    |     product-name     |
    |The Out of Stock Snowboard|

    Scenario: Add multiple quantities of a product to the cart
        Given I am on the product detail page for "<product-name>"
        When I select "<color>" color of "<product-name>"
        And I click "Add to Cart"
        And I select "<quantity>" quantities
        Then the cart should contain "<quantity>" items of "<product-name>"


    Examples:
    | color    | product-name         |quantity |
    | Ice      |The Complete Snowboard|    2    |
    | Dawn     |The Complete Snowboard|    2    |
    | Powder   |The Complete Snowboard|    2    |
    | Electric |The Complete Snowboard|    2    |
    | Sunset   |The Complete Snowboard|    2    |
