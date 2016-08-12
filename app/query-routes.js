function* webhook() {
  if (this.request.query['hub.verify_token'] === process.env.WEBHOOK_TOKEN) {
      this.body = this.request.query['hub.challenge'];
    } else {
      this.throw('Error, wrong validation token');    
    }
}

export default { webhook };
