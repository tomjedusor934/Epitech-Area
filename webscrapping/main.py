from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
import chromedriver_autoinstaller
from pyvirtualdisplay import Display
import time

display = Display(visible=0, size=(1700, 800))
# display = Display(visible=1, size=(1700, 800))
display.start()
chromedriver_autoinstaller.install()
chrome_options = Options()
# chrome_options.add_argument("--headless")
chrome_options.add_argument("--window-size=1200,1200")
# chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--ignore-certificate-errors")
driver = webdriver.Chrome(options=chrome_options)

try:
    url = 'https://area.tal-web.com/'
    driver.get(url)

    time.sleep(3)

    #Home Page
    driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[4]/div/ul/li[1]/a').click()
    time.sleep(3)

    #Login Page
    driver.find_element(By.XPATH, '//*[@id="email"]').send_keys("test")
    driver.find_element(By.XPATH, '//*[@id="password"]').send_keys("test")
    driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[3]/div/div[1]/form/div[3]/button').click()
    time.sleep(3)

    #Tools Page
    print("My Area")
    driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[2]/div/ul/li[1]/ul/li[2]/h4').click()
    time.sleep(2)
    print("My API")
    driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[2]/div/ul/li[1]/ul/li[3]/h4').click()
    time.sleep(2)
    print("Creation d'Area")
    driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[2]/div/ul/li[1]/ul/li[4]/h4').click()
    time.sleep(2)
    print("Dashboard Page")
    driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[2]/div/ul/li[1]/ul/li[1]/h4').click()
    time.sleep(2)

    #Other Page
    print("Notification Page")
    driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[2]/div/ul/li[2]/ul/li[1]/div[2]/h4').click()
    time.sleep(2)
    print("Profile Page")
    driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[2]/div/ul/li[2]/ul/li[2]/h4').click()
    time.sleep(2)
    print("Support Page")
    driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[2]/div/ul/li[2]/ul/li[3]/h4').click()
    time.sleep(2)

    #Custom
    print("Creation d'Area")
    driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[2]/div/ul/li[1]/ul/li[4]/h4').click()
    time.sleep(2)
    driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[3]/div/div[2]/div[2]/ul/li[4]').click()

    #Create Area Page
    print("Select Action")
    actions = ActionChains(driver)
    x_coordinate = 450
    y_coordinate = 300

    actions.move_by_offset(x_coordinate, y_coordinate)
    actions.context_click()
    actions.perform()

    driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[3]/div/div[3]/div[2]/div/div/ul/li[1]').click()
    time.sleep(3)
    driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[3]/div/div[3]/div[2]/div/div/div/ul/li[1]').click()
    time.sleep(3)

    print("Select Reaction")
    actions = ActionChains(driver)
    x_coordinate = 450
    y_coordinate = 300

    actions.move_by_offset(x_coordinate, y_coordinate)
    actions.context_click()
    actions.perform()

    driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[3]/div/div[3]/div[2]/div/div/ul/li[2]').click()
    time.sleep(3)
    driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[3]/div/div[3]/div[2]/div/div/div/ul/li[1]').click()
    time.sleep(3)
    driver.quit()
    display.stop()
    exit(0)
except Exception as e:
    print("Error" + str(e))
    driver.quit()
    exit(1)
