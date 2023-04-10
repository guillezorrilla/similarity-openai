'use client';

import { Button, buttonVariants } from '@/components/ui/Button';
import LargeHeading from '@/components/ui/LargeHeading';
import Paragraph from '@/components/ui/Paragraph';

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="absolute inset-0 max-auto container flex h-screen flex-col items-center justify-center">
      <div className="max-auto flex w-full flex-col justify-center space-y-6 max-w-lg">
        <div className="flex flex-col items-center gap-6 text-center">
          <LargeHeading>Error</LargeHeading>
          <Paragraph>
            Something happended. Please try again {error.message}
          </Paragraph>
          <Button
            onClick={reset}
            className={buttonVariants({
              variant: 'outline',
              className: 'w-fit'
            })}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default error;
