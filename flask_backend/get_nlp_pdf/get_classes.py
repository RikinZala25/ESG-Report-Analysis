# Define categories and their respective labels
categories = {
    "Emission": ["GHG_Emissions", "Ecological_Impacts", "Energy_Management", "Physical_Impacts_Of_Climate_Change"],
    "Resource Use": ["Waste_And_Hazardous_Materials_Management", "Water_And_Wastewater_Management"],
    "Innovation": ["Product_Design_And_Lifecycle_Management"],
    "Workforce": ["Employee_Engagement_Inclusion_And_Diversity", "Employee_Health_And_Safety"],
    "Community": ["Customer_Privacy", "Customer_Welfare"],
    "Human Rights": ["Human_Rights_And_Community_Relations"],
    "Product Responsibility": ["Business_Model_Resilience", "Product_Quality_And_Safety", "Supply_Chain_Management"],
    "Management": ["Director_Removal", "Management_Of_Legal_And_Regulatory_Framework"],
    "Shareholders": ["Business_Model_Resilience", "Supply_Chain_Management", "Systemic_Risk_Management"]
}

# Class distribution dictionary
class_distribution = {
    "E": ["Emission", "Resource Use", "Innovation"],
    "S": ["Workforce", "Community", "Human Rights", "Product Responsibility"],
    "G": ["Management", "Shareholders"]
}

def generate_class_categories(output_list):

    # Initialize dictionaries to store category sums and counts
    category_sums = {category: 0 for category in categories}
    category_counts = {category: 0 for category in categories}

    # Iterate through the output_list and accumulate sums and counts
    for label, score in output_list.items():
        for category, labels_in_category in categories.items():
            if label in labels_in_category:
                category_sums[category] += score
                category_counts[category] += 1

    # Calculate the average for each category
    category_averages = {
        category: category_sums[category] / category_counts[category]
        for category in categories
    }

    # print(category_averages)

    class_averages = {}
    for class_label, class_categories in class_distribution.items():
        class_score_sum = sum(category_averages[category] for category in class_categories)
        class_averages[class_label] = class_score_sum / len(class_categories)

    # print(class_averages)

    return [ class_averages, category_averages ]