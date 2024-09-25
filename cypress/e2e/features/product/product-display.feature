Feature: Display products on homepage
  As a customer
  I want to see the list of available products with their names and prices
  So that I can decide what to buy

  Scenario: Display list of products on the homepage
    Given I am on the homepage
    When the page loads
    Then I should see a list of products
    And each product should have an image
    And each product should have a name
    And each product should have a price
    And the price should be displayed in EUR with two decimal points
