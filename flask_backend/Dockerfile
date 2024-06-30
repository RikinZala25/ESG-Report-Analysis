FROM python:3.9-slim

ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Installing Java for Tika
RUN apt-get update && \
    apt-get install -y openjdk-11-jdk ;

COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 80

CMD ["python", "server.py"]
