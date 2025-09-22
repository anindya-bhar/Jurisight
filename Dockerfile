# Dockerfile for Google Cloud Run
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY . .

# Create non-root user for security
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

# Expose the port that Cloud Run expects
EXPOSE 8080

# Run the application
CMD exec uvicorn cloud_main:app --host 0.0.0.0 --port ${PORT:-8080} --workers 1