export class NotificationHelper {
  static replacePlaceholders(model: any, textToBeReplaced: string): string {
    const placeholders = textToBeReplaced.match(/\$\w+\$/g);
    if (placeholders) {
      placeholders.forEach((placeholder) => {
        const key = placeholder.replace(/\$/g, ''); // Remove the $ symbols from the placeholder
        if (model.hasOwnProperty(key)) {
          textToBeReplaced = textToBeReplaced.replace(placeholder, model[key]); // Replace the placeholder with the corresponding value from the model
        } else {
          throw new Error(
            `Placeholder "${placeholder}" not found in the model`,
          ); // Throw an exception if the placeholder is not found in the model
        }
      });
    }
    return textToBeReplaced;
  }
}
