import base64
import json
import sys
import time
import urllib.request
from pathlib import Path

import websocket


PROJECT = Path(r"E:\фриланс\сайты\META4PRO — основа v3")
PORT = 9233
QA = PROJECT / ".impeccable" / "review"
QA.mkdir(parents=True, exist_ok=True)
sys.stdout.reconfigure(encoding='utf-8')


def connect():
    targets = json.load(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json"))
    page = next(target for target in targets if target.get("type") == "page" and "127.0.0.1:4174" in target.get("url", ""))
    return websocket.create_connection(page["webSocketDebuggerUrl"], origin=f"http://127.0.0.1:{PORT}")


socket = connect()
message_id = 0
events = []


def command(method, params=None):
    global message_id
    message_id += 1
    current_id = message_id
    socket.send(json.dumps({"id": current_id, "method": method, "params": params or {}}))
    while True:
        response = json.loads(socket.recv())
        if "method" in response:
            events.append(response)
        if response.get("id") == current_id:
            if "error" in response:
                raise RuntimeError(response["error"])
            return response.get("result", {})


def evaluate(expression):
    result = command("Runtime.evaluate", {"expression": expression, "returnByValue": True, "awaitPromise": True})
    if "exceptionDetails" in result:
        raise RuntimeError(result["exceptionDetails"])
    return result["result"].get("value")


def screenshot(name):
    result = command("Page.captureScreenshot", {"format": "png", "captureBeyondViewport": False})
    (QA / name).write_bytes(base64.b64decode(result["data"]))


def set_viewport(width, height, mobile):
    command("Emulation.setDeviceMetricsOverride", {
        "width": width,
        "height": height,
        "deviceScaleFactor": 1,
        "mobile": mobile,
    })
    command("Emulation.setPageScaleFactor", {"pageScaleFactor": 1})
    command("Page.reload", {"ignoreCache": True})
    time.sleep(1.0)
    evaluate("document.fonts.ready.then(() => true)")
    evaluate("document.documentElement.style.scrollBehavior = 'auto'")


command("Runtime.enable")
command("Log.enable")
set_viewport(390, 844, True)
evaluate("scrollTo(0, 0)")
time.sleep(0.25)
events.clear()

mobile_layout = evaluate("""
(() => {
  const width = document.documentElement.clientWidth;
  return {
    viewport: [innerWidth, innerHeight],
    scrollWidth: document.documentElement.scrollWidth,
    overflowFree: document.documentElement.scrollWidth <= width,
    wideElements: [...document.querySelectorAll('body *')]
      .map(node => {
        const rect = node.getBoundingClientRect();
        return {node: node.tagName + '.' + node.className, left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width)};
      })
      .filter(item => item.left < -2 || item.right > width + 2)
      .slice(0, 16),
    rigParts: document.querySelectorAll('.rig-part').length,
    loadedRigParts: [...document.querySelectorAll('.rig-part')].filter(image => image.complete && image.naturalWidth > 0).length,
    etherDisabled: !document.querySelector('.hero-ether canvas'),
    circularDisabled: !document.querySelector('.circular-shell canvas'),
    stickyVisible: getComputedStyle(document.querySelector('.mobile-sticky-book')).display !== 'none'
  };
})()
""")
screenshot("mobile.png")

evaluate("""
(() => {
  const section = document.querySelector('.hardware-hero');
  const travel = section.offsetHeight - innerHeight;
  scrollTo(0, section.offsetTop + travel * .55);
  return true;
})()
""")
time.sleep(0.45)
screenshot("mobile-rig-mid.png")

evaluate("""
(() => {
  const section = document.querySelector('.hardware-hero');
  const travel = section.offsetHeight - innerHeight;
  scrollTo(0, section.offsetTop + travel * .97);
  return true;
})()
""")
time.sleep(0.45)
mobile_rig = evaluate("""
(() => ({
  stage: document.querySelector('.hero-status strong').textContent,
  visibleParts: [...document.querySelectorAll('.rig-part')].filter(node => Number(getComputedStyle(node).opacity) > .05).length,
  finalOpacity: Number(getComputedStyle(document.querySelector('.rig-final')).opacity),
  finishOpacity: Number(getComputedStyle(document.querySelector('.hero-finish')).opacity)
}))()
""")
screenshot("mobile-rig-final.png")

evaluate("""
(() => {
  document.querySelector('#zones').scrollIntoView();
  const buttons = [...document.querySelectorAll('.zone-list button')];
  buttons[2].click();
  return true;
})()
""")
time.sleep(0.45)
zone_state = evaluate("""
(() => ({
  active: document.querySelector('.zone-list button.is-active .zone-name b').textContent,
  price: document.querySelector('.zone-list button.is-active .zone-price').textContent.trim()
}))()
""")
screenshot("mobile-zones.png")

evaluate("document.querySelector('#club').scrollIntoView()")
time.sleep(0.45)
screenshot("mobile-club.png")

evaluate("document.querySelector('#booking').scrollIntoView()")
time.sleep(0.35)
screenshot("mobile-booking.png")

set_viewport(1440, 900, False)
evaluate("scrollTo(0, 0)")
time.sleep(0.45)
screenshot("desktop.png")

evaluate("""
(() => {
  const section = document.querySelector('.hardware-hero');
  const travel = section.offsetHeight - innerHeight;
  scrollTo(0, section.offsetTop + travel * .55);
  return true;
})()
""")
time.sleep(0.5)
screenshot("desktop-rig-mid.png")

evaluate("document.querySelector('#zones').scrollIntoView()")
time.sleep(0.5)
screenshot("desktop-zones.png")

responsive = []
for width, height in ((360, 667), (390, 844), (430, 932), (768, 1024), (1366, 768), (1440, 900)):
    set_viewport(width, height, width < 820)
    evaluate("scrollTo(0, 0)")
    if width in (360, 430):
        screenshot(f"user-{width}.png")
    responsive.append(evaluate("""
    (() => ({
      viewport: [innerWidth, innerHeight],
      scrollWidth: document.documentElement.scrollWidth,
      overflowFree: document.documentElement.scrollWidth <= document.documentElement.clientWidth,
      heroTitleHeight: Math.round(document.querySelector('#hero-title').getBoundingClientRect().height),
      wideElements: [...document.querySelectorAll('body *')]
        .map(node => {
          const rect = node.getBoundingClientRect();
          return {node: node.tagName + '.' + node.className, left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width)};
        })
        .filter(item => item.left < -2 || item.right > document.documentElement.clientWidth + 2)
        .slice(0, 12)
    }))()
    """))

errors = []
for event in events:
    if event.get("method") == "Runtime.exceptionThrown":
        errors.append(event["params"].get("exceptionDetails", {}))
    if event.get("method") == "Log.entryAdded" and event["params"]["entry"].get("level") == "error":
        errors.append(event["params"]["entry"])

print(json.dumps({
    "mobileLayout": mobile_layout,
    "mobileRig": mobile_rig,
    "zone": zone_state,
    "responsive": responsive,
    "browserErrors": errors,
}, ensure_ascii=False, indent=2))
socket.close()
