import { assert } from 'chai';

import ObserverMixin from './ObserverMixin';

describe('ObserverMixin', () => {
  describe('shall store list of subscribers', () => {
    const publisher = { ...ObserverMixin };
    const subscriber1 = {};
    const subscriber2 = {};
    const subscribers = [subscriber1, subscriber2];

    publisher.addSubscriber('change', subscriber1);
    publisher.addSubscriber('change', subscriber2);

    subscribers.forEach((subscriber, i) => {
      const publisherSubscriber = publisher._eventSubscribers.change[i];

      it(`subscriber${i + 1} is in the list`, () => {
        assert.equal(subscriber, publisherSubscriber);
      });
    });
  });

  describe('shall remove subscribers from the list by request', () => {
    const publisher = { ...ObserverMixin };
    const subscriber1 = {};
    const subscriber2 = {};
    const subscriber3 = {};
    const subscribers = [subscriber1, subscriber2, subscriber3];
    const cuttedSubscribers = [subscriber1, subscriber3];

    publisher.addSubscriber('change', subscriber1);
    publisher.addSubscriber('change', subscriber2);
    publisher.addSubscriber('change', subscriber3);

    const publisherSubscribers = publisher._eventSubscribers.change;

    subscribers.forEach((subscriber, i) => {
      const publisherSubscriber = publisher._eventSubscribers.change[i];

      it(`subscriber${i + 1} is in the list`, () => {
        assert.equal(subscriber, publisherSubscriber);
      });
    });

    publisher.removeSubscriber('change', subscriber2);

    it(`subscriber2 is removed from the list`, () => {
      assert.deepEqual(cuttedSubscribers, publisherSubscribers);
    });
  });

  describe('shall trigger subscribers', () => {
    const publisher = { ...ObserverMixin };
    const subscribers = [];

    for (let i = 0; i < 3; i += 1) {
      subscribers.push({
        isNotified: false,
        update(value) {
          this.isNotified = true;
          this.value = value;
        },
      });
    }

    const subscriberHandlers = subscribers.map((subscriber) =>
      subscriber.update.bind(subscriber),
    );

    subscriberHandlers.forEach((subscriberHandler) =>
      publisher.addSubscriber('change', subscriberHandler),
    );

    const publisherSubscribers = publisher._eventSubscribers.change;

    it(`subscribers are in the list`, () => {
      assert.deepEqual(subscriberHandlers, publisherSubscribers);
    });

    publisher.triggerSubscribers('change', 'Hello');

    context(`subscribers are notified`, () => {
      subscribers.forEach((subscriber, i) => {
        it(`subscriber${i + 1} is notified`, () => {
          assert.isTrue(subscriber.isNotified);
        });
      });
    });

    context(`value is accepted`, () => {
      subscribers.forEach((subscriber, i) => {
        it(`subscriber${i + 1} has value`, () => {
          assert.equal(subscriber.value, 'Hello');
        });
      });
    });
  });
});
