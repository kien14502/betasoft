import { Checkbox } from '@/components/ui/checkbox';
import { specialCharRegex } from '@/constants/regex';
import { cn } from '@/lib/utils';

type Props = {
  password: string;
};

const PasswordRules = ({ password }: Props) => {
  const defaultSpecialCharRegex = specialCharRegex || /[!@#$%^&*]/;

  const rules = [
    {
      regex: /^.{6,}$/,
      description: 'Must be at least 6 characters',
    },
    {
      regex: defaultSpecialCharRegex,
      description: 'Must contain 1 special character',
    },
  ];

  return (
    <div className="space-y-2">
      {rules.map((rule, i) => {
        const isChecked = rule.regex.test(password);

        return (
          <div key={i} className="flex items-center space-x-2 text-sm">
            <Checkbox
              className={cn(
                'rounded-full w-5 h-5',
                isChecked
                  ? 'data-[state=checked]:bg-blue-3'
                  : 'data-[state=checked]:bg-gray-2 data-[state=checked]:border-none',
              )}
              checked={true}
              aria-label={rule.description}
            />
            <label className={cn(isChecked ? 'text-green-600' : 'text-gray-500', 'text-xs')}>
              {rule.description}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default PasswordRules;
