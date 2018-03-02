# Use node 8.5.0
FROM rbecheras/node-plantuml

# Copy source code
COPY . /app

# Change working directory
WORKDIR /app

# Install dependencies
RUN npm install

# Expose API port to the outside
EXPOSE 8182

# Launch application
CMD ["npm","start"]