import re
import pandas as pd
import time

import tika
tika.initVM()
from tika import parser

from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline

from . import get_classes, structure_data

# HuggingFace - ESG-BERT Model
tokenizer = AutoTokenizer.from_pretrained("nbroad/ESG-BERT")
model = AutoModelForSequenceClassification.from_pretrained("nbroad/ESG-BERT")

# Create the pipeline for text classification
classifier = pipeline('text-classification', model=model, tokenizer=tokenizer, truncation=True, max_length=10)

# find the execution time
def format_time(seconds):
    hours, remainder = divmod(seconds, 3600)
    minutes, seconds = divmod(remainder, 60)

    time_components = []
    
    if hours > 0:
        time_components.append(f"{int(hours)} Hours")
    if minutes > 0:
        time_components.append(f"{int(minutes)} Minutes")
    if seconds > 0 or not time_components:
        time_components.append(f"{int(seconds)} Seconds")
    
    return ', '.join(time_components)

# Create a Class to parse PDF
class PDFParser:
    def __init__(self, file_path):
        self.file_path = file_path
        self.raw = parser.from_file(self.file_path)
        self.text = self.raw['content']

    def get_text(self):
        return self.text

    def get_text_clean(self):
        text = self.text
        text = re.sub(r'\n', ' ', text)
        text = re.sub(r'\s+', ' ', text)
        url_str = (r"((http|https)\:\/\/)?[a-zA-Z0-9\.\/\?\:@\-_=#]+\."
                       r"([a-zA-Z]){2,6}([a-zA-Z0-9\.\&\/\?\:@\-_=#])*")
        text = re.sub(url_str, r" ", text)  # URLs
        text = re.sub(r"^\s?\d+(.*)$", r"\1", text)  # headers
        text = re.sub(r"\d{5,}", r" ", text)  # figures
        text = re.sub(r"\.+", ".", text)  # multiple periods

        text = text.strip()  # leading & trailing spaces
        text = re.sub(r"\s+", " ", text)  # multiple spaces
        text = re.sub(r"\s?([,:;\.])", r"\1", text)  # punctuation spaces
        text = re.sub(r"\s?-\s?", "-", text)  # split-line words
        return text

    def get_text_clean_list(self):
        text = self.get_text_clean()
        text_list = text.split('.')
        return text_list

def run_classifier(url):
    pp = PDFParser(url)
    sentences = pp.get_text_clean_list()
    print(f"The sustainability report has {len(sentences):,d} sentences")
    
    start_time = time.time()
    result = classifier(sentences)
    end_time = time.time()
    
    execution_time = format_time(end_time - start_time)

    df = pd.DataFrame(result)
    return (df, execution_time)

def nlp_parser(company_symbol, full_name, report_year, url):
    input_link, execution_time = run_classifier(url)
    output = input_link.groupby(['label']).mean()

    output_list = output.reset_index().set_index('label')['score'].to_dict()

    class_distribution, category_distribution = get_classes.generate_class_categories(output_list)

    final_nlp_report = structure_data.getData(company_symbol, full_name, report_year, category_distribution, class_distribution, output_list, execution_time)

    return final_nlp_report