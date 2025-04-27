export type NotificationError = {
    message: string
    context: string
}

export class Notification {
    private errors: NotificationError[] = []

    addError(error: NotificationError) {
        this.errors.push(error)
    }

    message(context?: string): string{
        let message = ''

        this.errors.forEach(err => {
            if(context === undefined || context === err.context){
                message+=`${err.context}: ${err.message},`
            }
        });

        return message
    }
}