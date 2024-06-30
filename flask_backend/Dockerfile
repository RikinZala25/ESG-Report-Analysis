# Stage 1: Build stage with Python dependencies
FROM python:3.11-slim as python_build

# Set environment variables
ENV PYTHONUNBUFFERED 1

# Copy requirements file and install dependencies
COPY requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip install -r requirements.txt

# Stage 2: Final image with OpenJDK and Python components
FROM openjdk:11-slim

# Set JAVA_HOME environment variable
ENV JAVA_HOME /usr/local/openjdk-11

# Copy Python dependencies from previous stage
COPY --from=python_build /usr/local/lib/python3.11/site-packages/ /usr/local/lib/python3.11/site-packages/
COPY --from=python_build /usr/local/bin /usr/local/bin

# Set the working directory in the container
WORKDIR /app

# Copy the rest of the application code
COPY . /app

EXPOSE 80

# Define command to run the application
CMD ["python", "server.py"]
