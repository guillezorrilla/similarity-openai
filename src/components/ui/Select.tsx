import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { FC, ReactHTMLElement } from 'react';

const selectVariants = cva(
  'cursor-pointer active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900',
  {
    variants: {
      variant: {
        default:
          'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-100',
        destructive: 'text-white hover:bg-red-600 dark:hover:bg-red-600',
        outline:
          'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-100 border border-slate-200 dark:border-slate-700',
        subtle:
          'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100',
        ghost:
          'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent',
        link: 'bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

interface ISelectOptions {
  label: string;
  value: string;
}

interface ISelectProps extends VariantProps<typeof selectVariants> {
  variant?: 'default' | 'destructive' | 'outline' | 'subtle' | 'ghost' | 'link';
  options?: ISelectOptions[];
  className?: string;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: FC<ISelectProps> = ({
  className,
  options,
  defaultValue,
  variant,
  disabled,
  value,
  onChange
}) => {
  return (
    <select
      className={cn(selectVariants({ variant, className }))}
      defaultValue={defaultValue}
      value={value}
      disabled={disabled}
      onChange={onChange}>
      {options?.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
Select.displayName = 'select';

export { Select as Select, selectVariants, type ISelectOptions };
