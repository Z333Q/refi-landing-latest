/*
  # Add email notification trigger for investor forms

  1. Changes
    - Create a trigger function that calls the edge function when a new investor form is submitted
    - Set up the trigger to fire after INSERT on investor_forms table
    - The trigger will invoke the notify-investor-form edge function via HTTP request

  2. Purpose
    - Automatically send email notifications to zeshan@refi.trading when investors submit the form
    - Provides immediate visibility into new investor interest
*/

CREATE OR REPLACE FUNCTION notify_investor_form_submission()
RETURNS TRIGGER AS $$
DECLARE
  request_id bigint;
  function_url text;
BEGIN
  function_url := current_setting('app.settings.supabase_url', true) || '/functions/v1/notify-investor-form';
  
  SELECT
    net.http_post(
      url := function_url,
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
      ),
      body := jsonb_build_object('record', to_jsonb(NEW))
    ) INTO request_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_investor_form_submitted ON investor_forms;

CREATE TRIGGER on_investor_form_submitted
  AFTER INSERT ON investor_forms
  FOR EACH ROW
  EXECUTE FUNCTION notify_investor_form_submission();
