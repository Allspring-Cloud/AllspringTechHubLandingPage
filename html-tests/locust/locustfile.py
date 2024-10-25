from locust import HttpUser, task

class TechWebWIP(HttpUser):
    @task
    def techwebwip_index(self):
        self.client.get("/")
        