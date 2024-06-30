FROM python:3.9-slim

ENV PYTHONUNBUFFERED 1

# Installing Java for Tika
RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y openjdk-11-jdk \
    && apt-get clean;

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 80

CMD ["python", "server.py"]
