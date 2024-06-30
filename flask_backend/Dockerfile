FROM python:3.9-slim

ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN apt-get update --fix-missing \
    && apt-get install -y openjdk-11-jdk \
    && apt-get clean;

COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 80

CMD ["python", "server.py"]
