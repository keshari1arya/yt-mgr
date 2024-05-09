import { NotificationHelper } from './notification.helper';

describe('NotificationHelper', () => {
  describe('replacePlaceholders', () => {
    it('should replace placeholders with corresponding values from the model', () => {
      const model = {
        name: 'John Doe',
        age: 30,
      };
      const textToBeReplaced = 'Hello $name$, your age is $age$.';
      const expectedText = 'Hello John Doe, your age is 30.';

      const result = NotificationHelper.replacePlaceholders(
        model,
        textToBeReplaced,
      );

      expect(result).toEqual(expectedText);
    });

    it('should throw an error if a placeholder is not found in the model', () => {
      const model = {
        name: 'John Doe',
      };
      const textToBeReplaced = 'Hello $name$, your age is $age$.';

      expect(() => {
        NotificationHelper.replacePlaceholders(model, textToBeReplaced);
      }).toThrowError('Placeholder "$age$" not found in the model');
    });
  });
});
