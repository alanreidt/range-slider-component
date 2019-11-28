import { observerMixin } from "./observerMixin";


export function testObserverMixin() {


  describe("observerMixin", function () {

    describe("shall store list of subscribers", function () {
      let publisher = Object.assign({}, observerMixin);
      let subscriber1 = {};
      let subscriber2 = {};
      let subscribers = [subscriber1, subscriber2];

      publisher.addSubscriber("change", subscriber1);
      publisher.addSubscriber("change", subscriber2);

      subscribers.forEach((subscriber, i) => {
        let publisherSubscriber = publisher._eventSubscribers.change[i];

        it(`subscriber${i + 1} is in the list`, function () {
          assert.equal(subscriber, publisherSubscriber);
        });
      });
    });


    describe("shall remove subscribers from the list by request", function () {
      let publisher = Object.assign({}, observerMixin);
      let subscriber1 = {};
      let subscriber2 = {};
      let subscriber3 = {};
      let subscribers = [subscriber1, subscriber2, subscriber3];
      let cuttedSubscribers = [subscriber1, subscriber3];

      publisher.addSubscriber("change", subscriber1);
      publisher.addSubscriber("change", subscriber2);
      publisher.addSubscriber("change", subscriber3);

      let publisherSubscribers = publisher._eventSubscribers.change;

      subscribers.forEach((subscriber, i) => {
        let publisherSubscriber = publisher._eventSubscribers.change[i];

        it(`subscriber${i + 1} is in the list`, function () {
          assert.equal(subscriber, publisherSubscriber);
        });
      });

      publisher.removeSubscriber("change", subscriber2);

      it(`subscriber2 is removed from the list`, function () {
        assert.deepEqual(cuttedSubscribers, publisherSubscribers);
      });
    });


    describe("shall trigger subscribers", function () {
      const publisher = Object.assign({}, observerMixin);
      const subscribers = [];

      for (let i = 0; i < 3; i++) {
        subscribers.push({
          isNotified: false,
          update(value) {
            this.isNotified = true;
            this.value = value;
          }
        });
      }

      const subscriberHandlers = subscribers.map((subscriber) => subscriber.update.bind(subscriber));

      subscriberHandlers.forEach((subscriberHandler) => publisher.addSubscriber("change", subscriberHandler));

      const publisherSubscribers = publisher._eventSubscribers.change;

      it(`subscribers are in the list`, function () {
        assert.deepEqual(subscriberHandlers, publisherSubscribers);
      });

      publisher.triggerSubscribers("change", "Hello");

      context(`subscribers are notified`, function () {
        subscribers.forEach((subscriber, i) => {
          it(`subscriber${i + 1} is notified`, function () {
            assert.isTrue(subscriber.isNotified);
          });
        });
      });

      context(`value is accepted`, function () {
        subscribers.forEach((subscriber, i) => {
          it(`subscriber${i + 1} has value`, function () {
            assert.equal(subscriber.value, "Hello");
          });
        });
      });
    });

  });


}
